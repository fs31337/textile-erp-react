import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { materialSchema } from "../validation/materialSchema";
import { useNotification } from "../../../context/NotificationProvider/NotificationProvider";
import {
  Material,
  createMaterial,
  getMaterialById,
  updateMaterial,
} from "../../../services/MaterialService";
import { MaterialsData } from "../types";

export const useMaterialForm = (mode: "create" | "edit" | "view") => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(mode !== "create");
  const { id } = useParams<{ id: string }>();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<MaterialsData>({
    resolver: yupResolver(materialSchema),
    defaultValues: {
      name: "",
      description: "",
      cost: 0,
      current_stock: 0,
      unit_of_measure: "",
    },
  });

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && id) {
      setIsLoading(true);
      getMaterialById(Number(id))
        .then((response) => {
          reset(response.data);
          setIsLoading(false);
        })
        .catch(() => {
          showNotification("Error al cargar el material.", "error");
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [id, mode, reset, showNotification]);

  const onSubmit = (
    data: Omit<Material, "id" | "created_at" | "updated_at">
  ) => {
    if (mode === "create") {
      createMaterial(data)
        .then(() => {
          showNotification("Material creado con éxito.", "success");
          navigate("/materiales");
        })
        .catch(() => {
          showNotification("Error al crear el material.", "error");
        });
    } else if (mode === "edit" && id) {
      if (!isDirty) {
        showNotification("No hay cambios para guardar.", "info");
        return;
      }
      updateMaterial(Number(id), data)
        .then(() => {
          showNotification("Material modificado con éxito.", "success");
          navigate("/materiales");
        })
        .catch(() => {
          showNotification("Error al modificar el material.", "error");
        });
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    isLoading,
    isViewMode: mode === "view",
    onSubmit,
  };
};

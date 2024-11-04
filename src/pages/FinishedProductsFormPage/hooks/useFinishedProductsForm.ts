import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "../../../context/NotificationProvider/NotificationProvider";
import { finishedProductSchema } from "../validation/finishedProductsSchema";
import {
  createFinishedProduct,
  getFinishedProductById,
  updateFinishedProduct,
} from "../../../services/FinishedProductService";
import { FinishedProductData } from "../types";

export const useFinishedProductForm = (mode: "create" | "edit" | "view") => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(
    mode === "edit" || mode === "view"
  );
  const { id } = useParams<{ id: string }>();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<FinishedProductData>({
    resolver: yupResolver(finishedProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      current_stock: 0,
    },
  });

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && id) {
      setIsLoading(true);
      getFinishedProductById(Number(id))
        .then((response) => {
          reset(response.data);
          setIsLoading(false);
        })
        .catch(() => {
          showNotification("Error al cargar el producto.", "error");
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [id, mode, reset, showNotification]);

  const onSubmit = (data: FinishedProductData) => {
    if (mode === "create") {
      createFinishedProduct(data)
        .then(() => {
          showNotification("Producto creado con éxito.", "success");
          navigate("/productos-finalizados");
        })
        .catch(() => {
          showNotification("Error al crear el producto.", "error");
        });
    } else if (mode === "edit" && id) {
      if (!isDirty) {
        showNotification("No hay cambios para guardar.", "info");
        return;
      }
      updateFinishedProduct(Number(id), data)
        .then(() => {
          showNotification("Producto modificado con éxito.", "success");
          navigate("/productos-finalizados");
        })
        .catch(() => {
          showNotification("Error al modificar el producto.", "error");
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
    isDirty,
  };
};

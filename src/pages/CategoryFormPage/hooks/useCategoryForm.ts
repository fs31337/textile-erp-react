import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "../../../context/NotificationProvider/NotificationProvider";
import { categorySchema } from "../validation/categoriesSchema";
import {
  createCategory,
  getCategoryById,
  updateCategory,
} from "../../../services/CategoryService";

export interface CategoryData {
  name: string;
  description?: string;
}

export const useCategoryForm = (mode: "create" | "edit" | "view") => {
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
  } = useForm<CategoryData>({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && id) {
      setIsLoading(true);
      getCategoryById(Number(id))
        .then((response) => {
          reset(response);
          setIsLoading(false);
        })
        .catch(() => {
          showNotification("Error al cargar la categoría.", "error");
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [id, mode, reset, showNotification]);

  const onSubmit = (data: CategoryData) => {
    if (mode === "create") {
      createCategory(data)
        .then(() => {
          showNotification("Categoría creada con éxito.", "success");
          navigate("/categorias");
        })
        .catch(() => {
          showNotification("Error al crear la categoría.", "error");
        });
    } else if (mode === "edit" && id) {
      if (!isDirty) {
        showNotification("No hay cambios para guardar.", "info");
        return;
      }
      updateCategory(Number(id), data)
        .then(() => {
          showNotification("Categoría modificada con éxito.", "success");
          navigate("/categorias");
        })
        .catch(() => {
          showNotification("Error al modificar la categoría.", "error");
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

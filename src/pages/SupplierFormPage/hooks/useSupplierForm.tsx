import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchSupplierFormData } from "./useFetchSupplierFormData";

import { SupplierData } from "../types";
import { useNotification } from "../../../context/NotificationProvider/NotificationProvider";
import {
  createSupplier,
  getSupplierById,
  updateSupplier,
} from "../../../services/Suppliers";
import { supplierSchema } from "../validation/supplierSchema";

export const useSupplierForm = (mode: "create" | "edit" | "view") => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { supplierTypes, sectors, categories, loadingData, error } =
    useFetchSupplierFormData();
  const [isLoading, setIsLoading] = useState<boolean>(
    mode === "edit" || mode === "view"
  );
  const { id } = useParams<{ id: string }>();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<SupplierData>({
    resolver: yupResolver(supplierSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
      category_id: NaN,
      sector_id: NaN,
      supplier_type_id: NaN,
      website: undefined,
    },
  });

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && id) {
      setIsLoading(true);
      getSupplierById(Number(id))
        .then((response) => {
          reset({
            ...response.data,
            website: response.data.website || undefined,
          });
          setIsLoading(false);
        })
        .catch(() => {
          showNotification("Error al cargar el proveedor.", "error");
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [id, mode, reset, showNotification]);

  const onSubmit = (data: SupplierData) => {
    if (mode === "create") {
      createSupplier(data)
        .then(() => {
          showNotification("Proveedor creado con éxito.", "success");
          navigate("/proveedores");
        })
        .catch(() => {
          showNotification("Error al crear el proveedor.", "error");
        });
    } else if (mode === "edit" && id) {
      if (!isDirty) {
        showNotification("No hay cambios para guardar.", "info");
        return;
      }
      updateSupplier(Number(id), data)
        .then(() => {
          showNotification("Proveedor modificado con éxito.", "success");
          navigate("/proveedores");
        })
        .catch(() => {
          showNotification("Error al modificar el proveedor.", "error");
        });
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    isLoading,
    loadingData,
    error,
    categories,
    sectors,
    supplierTypes,
    isViewMode: mode === "view",
    onSubmit,
    isDirty,
  };
};

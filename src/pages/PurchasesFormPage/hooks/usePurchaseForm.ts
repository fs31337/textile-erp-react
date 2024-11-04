import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";

import { purchaseSchema } from "../validation/purchaseSchema";

import { useNotification } from "../../../context/NotificationProvider/NotificationProvider";
import { getSuppliers, Supplier } from "../../../services/Suppliers";
import { PurchaseData } from "../types";
import {
  createPurchase,
  getPurchaseById,
  Purchase,
  updatePurchase,
} from "../../../services/PurchaseService";

export const usePurchaseForm = (mode: "create" | "edit" | "view") => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(mode !== "create");
  const { id } = useParams<{ id: string }>();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<PurchaseData>({
    resolver: yupResolver(purchaseSchema),
    defaultValues: {
      supplier_id: 0,
      date: "",
      total: "",
    },
  });

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && id) {
      setIsLoading(true);
      getPurchaseById(Number(id))
        .then((response) => {
          reset(response.data);
          setIsLoading(false);
        })
        .catch(() => {
          showNotification("Error al cargar la compra.", "error");
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [id, mode, reset, showNotification]);

  useEffect(() => {
    setIsLoading(true);
    getSuppliers()
      .then((response) => {
        setSuppliers(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        showNotification("Error al cargar los proveedores.", "error");
        setIsLoading(false);
      });
  }, [showNotification]);

  const onSubmit = (
    data: Omit<Purchase, "id" | "created_at" | "updated_at">
  ) => {
    if (mode === "create") {
      createPurchase(data)
        .then(() => {
          showNotification("Compra creada con éxito.", "success");
          navigate("/compras");
        })
        .catch(() => {
          showNotification("Error al crear la compra.", "error");
        });
    } else if (mode === "edit" && id) {
      if (!isDirty) {
        showNotification("No hay cambios para guardar.", "info");
        return;
      }
      updatePurchase(Number(id), data)
        .then(() => {
          showNotification("Compra modificada con éxito.", "success");
          navigate("/compras");
        })
        .catch(() => {
          showNotification("Error al modificar la compra.", "error");
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
    suppliers,
    isDirty,
  };
};

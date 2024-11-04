import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import {
  createSalesOrder,
  getSalesOrderById,
  updateSalesOrder,
} from "../../../services/SalesOrderService";
import { salesOrderSchema } from "../validation/salesOrderSchema";
import { useNotification } from "../../../context/NotificationProvider/NotificationProvider";
import { SalesOrderData } from "../types";

export const useSalesOrderForm = (mode: "create" | "edit" | "view") => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(
    mode === "edit" || mode === "view"
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<SalesOrderData>({
    resolver: yupResolver(salesOrderSchema),
    defaultValues: {
      customer_id: 0,
      total: 0,
      status: "",
      date: "",
    },
  });

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && id) {
      setIsLoading(true);
      getSalesOrderById(Number(id))
        .then((response) => {
          reset(response.data);
          setIsLoading(false);
        })
        .catch(() => {
          showNotification("Error al cargar la orden de venta.", "error");
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [id, mode, reset, showNotification]);

  const onSubmit = async (data: SalesOrderData) => {
    try {
      if (mode === "create") {
        await createSalesOrder(data);
        showNotification("Orden de venta creada con éxito.", "success");
      } else if (mode === "edit" && id) {
        if (!isDirty) {
          showNotification("No hay cambios para guardar.", "info");
          return;
        }
        await updateSalesOrder(Number(id), data);
        showNotification("Orden de venta actualizada con éxito.", "success");
      }
      navigate("/ventas");
    } catch {
      showNotification("Error al guardar la orden de venta.", "error");
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

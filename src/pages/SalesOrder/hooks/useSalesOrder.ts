import { useState, useEffect } from "react";
import {
  getSalesOrders,
  createSalesOrder,
  updateSalesOrder,
  deleteSalesOrder,
  SalesOrder,
} from "../../../services/SalesOrderService";
import { useNotification } from "../../../context/NotificationProvider/NotificationProvider";

interface UseSalesOrdersResult {
  salesOrders: SalesOrder[];
  loading: boolean;
  error: Error | null;
  createOrder: (
    order: Omit<SalesOrder, "id" | "created_at" | "updated_at">
  ) => Promise<void>;
  updateOrder: (
    id: number,
    order: Omit<SalesOrder, "id" | "created_at" | "updated_at">
  ) => Promise<void>;
  removeOrder: (id: number) => Promise<void>;
}

export const useSalesOrders = (): UseSalesOrdersResult => {
  const [salesOrders, setSalesOrders] = useState<SalesOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    setLoading(true);
    getSalesOrders()
      .then((response) => {
        setSalesOrders(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const createOrder = async (
    order: Omit<SalesOrder, "id" | "created_at" | "updated_at">
  ) => {
    try {
      await createSalesOrder(order);
      showNotification("Orden de venta creada con éxito.", "success");
      setSalesOrders((prev) => [...prev, order as SalesOrder]);
    } catch (err) {
      setError(err as Error);
      showNotification("Error al crear la orden de venta.", "error");
    }
  };

  const updateOrder = async (
    id: number,
    order: Omit<SalesOrder, "id" | "created_at" | "updated_at">
  ) => {
    try {
      await updateSalesOrder(id, order);
      showNotification("Orden de venta actualizada con éxito.", "success");
      setSalesOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, ...order } : o))
      );
    } catch (err) {
      setError(err as Error);
      showNotification("Error al actualizar la orden de venta.", "error");
    }
  };

  const removeOrder = async (id: number) => {
    try {
      await deleteSalesOrder(id);
      showNotification("Orden de venta eliminada con éxito.", "success");
      setSalesOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (err) {
      setError(err as Error);
      showNotification("Error al eliminar la orden de venta.", "error");
    }
  };

  return {
    salesOrders,
    loading,
    error,
    createOrder,
    updateOrder,
    removeOrder,
  };
};

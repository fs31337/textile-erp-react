import { useState, useEffect } from "react";
import {
  deleteSupplier,
  getSuppliers,
  Supplier,
} from "../../../services/Suppliers";
import { useNotification } from "../../../context/NotificationProvider/NotificationProvider";

interface UseSuppliersResult {
  suppliers: Supplier[];
  loading: boolean;
  error: Error | null;
  removeSupplier: (id: number) => Promise<void>;
}

export const useSuppliers = (): UseSuppliersResult => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { showNotification } = useNotification();
  useEffect(() => {
    setLoading(true);
    getSuppliers()
      .then((response) => {
        setSuppliers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const removeSupplier = async (id: number) => {
    try {
      await deleteSupplier(id);
      showNotification("Proveedor eliminado con éxito.", "success");
      setSuppliers((prev) => prev.filter((sup) => sup.id !== id));
    } catch (err) {
      showNotification("Error al eliminar Proveedor.", "error");
      setError(err as Error);
    }
  };
  return {
    suppliers,
    loading,
    error,
    removeSupplier,
  };
};

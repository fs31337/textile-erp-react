import { useState, useEffect } from "react";

import { useNotification } from "../../../context/NotificationProvider/NotificationProvider";
import {
  deleteFinishedProduct,
  FinishedProduct,
  getFinishedProducts,
} from "../../../services/FinishedProductService";

interface UseFinishedProductsResult {
  finishedProducts: FinishedProduct[];
  loading: boolean;
  error: Error | null;
  removeFinishedProduct: (id: number) => Promise<void>;
}

export const useFinishedProducts = (): UseFinishedProductsResult => {
  const [finishedProducts, setFinishedProducts] = useState<FinishedProduct[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    setLoading(true);
    getFinishedProducts()
      .then((response) => {
        setFinishedProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const removeFinishedProduct = async (id: number) => {
    try {
      await deleteFinishedProduct(id);
      showNotification("Producto eliminado con éxito.", "success");
      setFinishedProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );
    } catch (err) {
      showNotification("Error al eliminar el producto.", "error");
      setError(err as Error);
    }
  };

  return {
    finishedProducts,
    loading,
    error,
    removeFinishedProduct,
  };
};

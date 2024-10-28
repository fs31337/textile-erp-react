import { useState, useEffect } from "react";

import { useNotification } from "../../../context/NotificationProvider/NotificationProvider";
import {
  deletePurchase,
  getPurchases,
  Purchase,
} from "../../../services/PurchaseService";

interface UsePurchasesResult {
  purchases: Purchase[];
  loading: boolean;
  error: Error | null;
  removePurchase: (id: number) => Promise<void>;
}

export const usePurchases = (): UsePurchasesResult => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    setLoading(true);
    getPurchases()
      .then((response) => {
        setPurchases(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const removePurchase = async (id: number) => {
    try {
      await deletePurchase(id);
      showNotification("Compra eliminada con éxito.", "success");
      setPurchases((prev) => prev.filter((purchase) => purchase.id !== id));
    } catch (err) {
      showNotification("Error al eliminar la compra.", "error");
      setError(err as Error);
    }
  };

  return {
    purchases,
    loading,
    error,
    removePurchase,
  };
};

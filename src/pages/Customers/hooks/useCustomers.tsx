import { useState, useEffect } from "react";

import { useNotification } from "../../../context/NotificationProvider/NotificationProvider";
import {
  Customer,
  deleteCustomer,
  getCustomers,
} from "../../../services/CustomerService";

interface UseCustomersResult {
  customers: Customer[];
  loading: boolean;
  error: Error | null;
  removeCustomer: (id: number) => Promise<void>;
}

export const useCustomers = (): UseCustomersResult => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    setLoading(true);
    getCustomers()
      .then((response) => {
        setCustomers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const removeCustomer = async (id: number) => {
    try {
      await deleteCustomer(id);
      showNotification("Cliente eliminado con éxito.", "success");
      setCustomers((prev) => prev.filter((customer) => customer.id !== id));
    } catch (err) {
      showNotification("Error al eliminar el cliente.", "error");
      setError(err as Error);
    }
  };

  return {
    customers,
    loading,
    error,
    removeCustomer,
  };
};

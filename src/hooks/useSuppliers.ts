import { useState, useEffect } from "react";
import { getSuppliers, Supplier } from "../services/Suppliers";

interface UseSuppliersResult {
  suppliers: Supplier[];
  loading: boolean;
  error: Error | null;
}

const useSuppliers = (): UseSuppliersResult => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

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

  return { suppliers, loading, error };
};

export default useSuppliers;

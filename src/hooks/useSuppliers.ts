import { useState, useEffect } from "react";
import {
  createSupplier,
  deleteSupplier,
  getSuppliers,
  Supplier,
  updateSupplier,
} from "../services/Suppliers";

interface UseSuppliersResult {
  suppliers: Supplier[];
  loading: boolean;
  error: Error | null;
  addSupplier: (
    supplier: Omit<Supplier, "id" | "created_at" | "updated_at">
  ) => Promise<void>;
  editSupplier: (
    id: number,
    supplier: Omit<Supplier, "id" | "created_at" | "updated_at">
  ) => Promise<void>;
  removeSupplier: (id: number) => Promise<void>;
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
  const addSupplier = async (
    supplier: Omit<Supplier, "id" | "created_at" | "updated_at">
  ) => {
    try {
      const response = await createSupplier(supplier);
      setSuppliers((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err as Error);
    }
  };

  const editSupplier = async (
    id: number,
    supplier: Omit<Supplier, "id" | "created_at" | "updated_at">
  ) => {
    try {
      const response = await updateSupplier(id, supplier);
      setSuppliers((prev) =>
        prev.map((sup) => (sup.id === id ? response.data : sup))
      );
    } catch (err) {
      setError(err as Error);
    }
  };

  const removeSupplier = async (id: number) => {
    try {
      await deleteSupplier(id);
      setSuppliers((prev) => prev.filter((sup) => sup.id !== id));
    } catch (err) {
      setError(err as Error);
    }
  };
  return {
    suppliers,
    loading,
    error,
    addSupplier,
    editSupplier,
    removeSupplier,
  };
};

export default useSuppliers;

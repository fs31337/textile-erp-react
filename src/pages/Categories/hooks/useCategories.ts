import { useState, useEffect } from "react";

import { useNotification } from "../../../context/NotificationProvider/NotificationProvider";
import {
  Category,
  deleteCategory,
  getCategories,
} from "../../../services/CategoryService";

interface UseCategoriesResult {
  categories: Category[];
  loading: boolean;
  error: Error | null;
  removeCategory: (id: number) => Promise<void>;
}

export const useCategories = (): UseCategoriesResult => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((response) => {
        setCategories(response);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const removeCategory = async (id: number) => {
    try {
      await deleteCategory(id);
      showNotification("Categoría eliminada con éxito.", "success");
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err) {
      showNotification("Error al eliminar la categoría.", "error");
      setError(err as Error);
    }
  };

  return {
    categories,
    loading,
    error,
    removeCategory,
  };
};

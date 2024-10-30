import { useState, useEffect } from "react";
import { useNotification } from "../../../context/NotificationProvider/NotificationProvider";
import {
  deleteMaterial,
  getMaterials,
  Material,
} from "../../../services/MaterialService";

interface UseMaterialsResult {
  materials: Material[];
  loading: boolean;
  error: Error | null;
  removeMaterial: (id: number) => Promise<void>;
}

export const useMaterials = (): UseMaterialsResult => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    setLoading(true);
    getMaterials()
      .then((response) => {
        setMaterials(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const removeMaterial = async (id: number) => {
    try {
      await deleteMaterial(id);
      showNotification("Material eliminado con éxito.", "success");
      setMaterials((prev) => prev.filter((material) => material.id !== id));
    } catch (err) {
      showNotification("Error al eliminar el material.", "error");
      setError(err as Error);
    }
  };

  return {
    materials,
    loading,
    error,
    removeMaterial,
  };
};

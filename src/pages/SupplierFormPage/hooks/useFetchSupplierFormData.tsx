import { useState, useEffect } from "react";
import {
  getSupplierTypes,
  SupplierType,
} from "../../../services/SupplierTypeService";
import { getSectors, Sector } from "../../../services/SectorService";
import { Category, getCategories } from "../../../services/CategoryService";

interface UseFetchSupplierFormDataResult {
  supplierTypes: SupplierType[];
  sectors: Sector[];
  categories: Category[];
  loadingData: boolean;
  error: string | null;
}

export const useFetchSupplierFormData = (): UseFetchSupplierFormDataResult => {
  const [supplierTypes, setSupplierTypes] = useState<SupplierType[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [supplierTypesData, sectorsData, categoriesData] =
          await Promise.all([
            getSupplierTypes(),
            getSectors(),
            getCategories(),
          ]);
        setSupplierTypes(supplierTypesData);
        setSectors(sectorsData);
        setCategories(categoriesData);
      } catch (error) {
        setError("Error al cargar datos del formulario");
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, []);

  return { supplierTypes, sectors, categories, loadingData, error };
};

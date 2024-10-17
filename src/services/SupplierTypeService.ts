import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export interface SupplierType {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export const getSupplierTypes = async (): Promise<SupplierType[]> => {
  const response = await axios.get<SupplierType[]>(
    `${API_BASE_URL}/suppliers-type`
  );
  return response.data;
};

export const getSupplierTypeById = async (
  id: number
): Promise<SupplierType> => {
  const response = await axios.get<SupplierType>(
    `${API_BASE_URL}/suppliers-type/${id}`
  );
  return response.data;
};

export const createSupplierType = async (
  supplierType: Omit<SupplierType, "id" | "created_at" | "updated_at">
): Promise<SupplierType> => {
  const response = await axios.post<SupplierType>(
    `${API_BASE_URL}/suppliers-type`,
    supplierType
  );
  return response.data;
};

export const updateSupplierType = async (
  id: number,
  supplierType: Omit<SupplierType, "id" | "created_at" | "updated_at">
): Promise<SupplierType> => {
  const response = await axios.put<SupplierType>(
    `${API_BASE_URL}/suppliers-type/${id}`,
    supplierType
  );
  return response.data;
};

export const deleteSupplierType = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/suppliers-type/${id}`);
};

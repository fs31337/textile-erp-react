import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export interface SupplierType {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export const getSupplierTypes = () => {
  return axios.get<SupplierType[]>(`${API_BASE_URL}/suppliers/type`);
};

export const getSupplierTypeById = (id: number) => {
  return axios.get<SupplierType>(`${API_BASE_URL}/suppliers/type/${id}`);
};

export const createSupplierType = (
  supplierType: Omit<SupplierType, "id" | "created_at" | "updated_at">
) => {
  return axios.post<SupplierType>(
    `${API_BASE_URL}/suppliers/type`,
    supplierType
  );
};

export const updateSupplierType = (
  id: number,
  supplierType: Omit<SupplierType, "id" | "created_at" | "updated_at">
) => {
  return axios.put<SupplierType>(
    `${API_BASE_URL}/suppliers/type/${id}`,
    supplierType
  );
};

export const deleteSupplierType = (id: number) => {
  return axios.delete(`${API_BASE_URL}/suppliers/type/${id}`);
};

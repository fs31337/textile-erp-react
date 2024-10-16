import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export interface FinishedProduct {
  id: number;
  name: string;
  description?: string;
  price: number;
  created_at?: string;
  updated_at?: string;
}

export const getFinishedProducts = () => {
  return axios.get<FinishedProduct[]>(`${API_BASE_URL}/products`);
};

export const getFinishedProductById = (id: number) => {
  return axios.get<FinishedProduct>(`${API_BASE_URL}/products/${id}`);
};

export const createFinishedProduct = (
  product: Omit<FinishedProduct, "id" | "created_at" | "updated_at">
) => {
  return axios.post<FinishedProduct>(`${API_BASE_URL}/products`, product);
};

export const updateFinishedProduct = (
  id: number,
  product: Omit<FinishedProduct, "id" | "created_at" | "updated_at">
) => {
  return axios.put<FinishedProduct>(`${API_BASE_URL}/products/${id}`, product);
};

export const deleteFinishedProduct = (id: number) => {
  return axios.delete(`${API_BASE_URL}/products/${id}`);
};

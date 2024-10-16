import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export interface Purchase {
  id: number;
  supplier_id: number;
  total_amount: number;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export const getPurchases = () => {
  return axios.get<Purchase[]>(`${API_BASE_URL}/purchases`);
};

export const getPurchaseById = (id: number) => {
  return axios.get<Purchase>(`${API_BASE_URL}/purchases/${id}`);
};

export const createPurchase = (
  purchase: Omit<Purchase, "id" | "created_at" | "updated_at">
) => {
  return axios.post<Purchase>(`${API_BASE_URL}/purchases`, purchase);
};

export const updatePurchase = (
  id: number,
  purchase: Omit<Purchase, "id" | "created_at" | "updated_at">
) => {
  return axios.put<Purchase>(`${API_BASE_URL}/purchases/${id}`, purchase);
};

export const deletePurchase = (id: number) => {
  return axios.delete(`${API_BASE_URL}/purchases/${id}`);
};

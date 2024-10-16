import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export interface PurchaseHistory {
  id: number;
  purchase_id: number;
  action: string;
  created_at?: string;
  updated_at?: string;
}

export const getPurchaseHistories = () => {
  return axios.get<PurchaseHistory[]>(`${API_BASE_URL}/purchases/history`);
};

export const getPurchaseHistoryById = (id: number) => {
  return axios.get<PurchaseHistory>(`${API_BASE_URL}/purchases/history/${id}`);
};

export const createPurchaseHistory = (
  history: Omit<PurchaseHistory, "id" | "created_at" | "updated_at">
) => {
  return axios.post<PurchaseHistory>(
    `${API_BASE_URL}/purchases/history`,
    history
  );
};

export const deletePurchaseHistory = (id: number) => {
  return axios.delete(`${API_BASE_URL}/purchases/history/${id}`);
};

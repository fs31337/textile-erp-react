import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export interface Cashier {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export const getCashiers = () => {
  return axios.get<Cashier[]>(`${API_BASE_URL}/cashiers`);
};

export const getCashierById = (id: number) => {
  return axios.get<Cashier>(`${API_BASE_URL}/cashiers/${id}`);
};

export const createCashier = (
  cashier: Omit<Cashier, "id" | "created_at" | "updated_at">
) => {
  return axios.post<Cashier>(`${API_BASE_URL}/cashiers`, cashier);
};

export const updateCashier = (
  id: number,
  cashier: Omit<Cashier, "id" | "created_at" | "updated_at">
) => {
  return axios.put<Cashier>(`${API_BASE_URL}/cashiers/${id}`, cashier);
};

export const deleteCashier = (id: number) => {
  return axios.delete(`${API_BASE_URL}/cashiers/${id}`);
};

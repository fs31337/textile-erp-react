import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export interface SalesOrder {
  id: number;
  customer_id: number;
  total: number;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export const getSalesOrders = () => {
  return axios.get<SalesOrder[]>(`${API_BASE_URL}/sales/order`);
};

export const getSalesOrderById = (id: number) => {
  return axios.get<SalesOrder>(`${API_BASE_URL}/sales/order/${id}`);
};

export const createSalesOrder = (
  order: Omit<SalesOrder, "id" | "created_at" | "updated_at">
) => {
  return axios.post<SalesOrder>(`${API_BASE_URL}/sales/order`, order);
};

export const updateSalesOrder = (
  id: number,
  order: Omit<SalesOrder, "id" | "created_at" | "updated_at">
) => {
  return axios.put<SalesOrder>(`${API_BASE_URL}/sales/order/${id}`, order);
};

export const deleteSalesOrder = (id: number) => {
  return axios.delete(`${API_BASE_URL}/sales/order/${id}`);
};

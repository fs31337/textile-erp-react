import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export interface ProductionOrder {
  id: number;
  product_id: number;
  quantity: number;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export const getProductionOrders = () => {
  return axios.get<ProductionOrder[]>(`${API_BASE_URL}/production/orders`);
};

export const getProductionOrderById = (id: number) => {
  return axios.get<ProductionOrder>(`${API_BASE_URL}/production/orders/${id}`);
};

export const createProductionOrder = (
  order: Omit<ProductionOrder, "id" | "created_at" | "updated_at">
) => {
  return axios.post<ProductionOrder>(
    `${API_BASE_URL}/production/orders`,
    order
  );
};

export const updateProductionOrder = (
  id: number,
  order: Omit<ProductionOrder, "id" | "created_at" | "updated_at">
) => {
  return axios.put<ProductionOrder>(
    `${API_BASE_URL}/production/orders/${id}`,
    order
  );
};

export const deleteProductionOrder = (id: number) => {
  return axios.delete(`${API_BASE_URL}/production/orders/${id}`);
};

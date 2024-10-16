import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export interface ProductionDetail {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  created_at?: string;
  updated_at?: string;
}

export const getProductionDetails = () => {
  return axios.get<ProductionDetail[]>(
    `${API_BASE_URL}/production/orders/details`
  );
};

export const getProductionDetailById = (id: number) => {
  return axios.get<ProductionDetail>(
    `${API_BASE_URL}/production/orders/details/${id}`
  );
};

export const createProductionDetail = (
  detail: Omit<ProductionDetail, "id" | "created_at" | "updated_at">
) => {
  return axios.post<ProductionDetail>(
    `${API_BASE_URL}/production/orders/details`,
    detail
  );
};

export const updateProductionDetail = (
  id: number,
  detail: Omit<ProductionDetail, "id" | "created_at" | "updated_at">
) => {
  return axios.put<ProductionDetail>(
    `${API_BASE_URL}/production/orders/details/${id}`,
    detail
  );
};

export const deleteProductionDetail = (id: number) => {
  return axios.delete(`${API_BASE_URL}/production/orders/details/${id}`);
};

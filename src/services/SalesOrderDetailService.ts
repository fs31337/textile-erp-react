import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export interface SalesOrderDetail {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  created_at?: string;
  updated_at?: string;
}

export const getSalesOrderDetails = () => {
  return axios.get<SalesOrderDetail[]>(`${API_BASE_URL}/sales/order/details`);
};

export const getSalesOrderDetailById = (id: number) => {
  return axios.get<SalesOrderDetail>(
    `${API_BASE_URL}/sales/order/details/${id}`
  );
};

export const createSalesOrderDetail = (
  detail: Omit<SalesOrderDetail, "id" | "created_at" | "updated_at">
) => {
  return axios.post<SalesOrderDetail>(
    `${API_BASE_URL}/sales/order/details`,
    detail
  );
};

export const updateSalesOrderDetail = (
  id: number,
  detail: Omit<SalesOrderDetail, "id" | "created_at" | "updated_at">
) => {
  return axios.put<SalesOrderDetail>(
    `${API_BASE_URL}/sales/order/details/${id}`,
    detail
  );
};

export const deleteSalesOrderDetail = (id: number) => {
  return axios.delete(`${API_BASE_URL}/sales/order/details/${id}`);
};

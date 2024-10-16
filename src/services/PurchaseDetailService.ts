import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export interface PurchaseDetail {
  id: number;
  purchase_id: number;
  material_id: number;
  quantity: number;
  unit_price: number;
  created_at?: string;
  updated_at?: string;
}

export const getPurchaseDetails = () => {
  return axios.get<PurchaseDetail[]>(`${API_BASE_URL}/purchases/details`);
};

export const getPurchaseDetailById = (id: number) => {
  return axios.get<PurchaseDetail>(`${API_BASE_URL}/purchases/details/${id}`);
};

export const createPurchaseDetail = (
  detail: Omit<PurchaseDetail, "id" | "created_at" | "updated_at">
) => {
  return axios.post<PurchaseDetail>(
    `${API_BASE_URL}/purchases/details`,
    detail
  );
};

export const updatePurchaseDetail = (
  id: number,
  detail: Omit<PurchaseDetail, "id" | "created_at" | "updated_at">
) => {
  return axios.put<PurchaseDetail>(
    `${API_BASE_URL}/purchases/details/${id}`,
    detail
  );
};

export const deletePurchaseDetail = (id: number) => {
  return axios.delete(`${API_BASE_URL}/purchases/details/${id}`);
};

import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export interface FinishedProductStockMovement {
  id: number;
  product_id: number;
  quantity: number;
  movement_type: string;
  created_at?: string;
  updated_at?: string;
}

export const getFinishedProductStockMovements = () => {
  return axios.get<FinishedProductStockMovement[]>(
    `${API_BASE_URL}/products/stock/movements`
  );
};

export const getFinishedProductStockMovementById = (id: number) => {
  return axios.get<FinishedProductStockMovement>(
    `${API_BASE_URL}/products/stock/movements/${id}`
  );
};

export const createFinishedProductStockMovement = (
  movement: Omit<
    FinishedProductStockMovement,
    "id" | "created_at" | "updated_at"
  >
) => {
  return axios.post<FinishedProductStockMovement>(
    `${API_BASE_URL}/products/stock/movements`,
    movement
  );
};

export const updateFinishedProductStockMovement = (
  id: number,
  movement: Omit<
    FinishedProductStockMovement,
    "id" | "created_at" | "updated_at"
  >
) => {
  return axios.put<FinishedProductStockMovement>(
    `${API_BASE_URL}/products/stock/movements/${id}`,
    movement
  );
};

export const deleteFinishedProductStockMovement = (id: number) => {
  return axios.delete(`${API_BASE_URL}/products/stock/movements/${id}`);
};

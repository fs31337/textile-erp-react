import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export interface PosTransaction {
  id: number;
  cashier_id: number;
  amount: number;
  transaction_type: string;
  created_at?: string;
  updated_at?: string;
}

export const getPosTransactions = () => {
  return axios.get<PosTransaction[]>(`${API_BASE_URL}/pos_transaction`);
};

export const getPosTransactionById = (id: number) => {
  return axios.get<PosTransaction>(`${API_BASE_URL}/pos_transaction/${id}`);
};

export const createPosTransaction = (
  transaction: Omit<PosTransaction, "id" | "created_at" | "updated_at">
) => {
  return axios.post<PosTransaction>(
    `${API_BASE_URL}/pos_transaction`,
    transaction
  );
};

export const updatePosTransaction = (
  id: number,
  transaction: Omit<PosTransaction, "id" | "created_at" | "updated_at">
) => {
  return axios.put<PosTransaction>(
    `${API_BASE_URL}/pos_transaction/${id}`,
    transaction
  );
};

export const deletePosTransaction = (id: number) => {
  return axios.delete(`${API_BASE_URL}/pos_transaction/${id}`);
};

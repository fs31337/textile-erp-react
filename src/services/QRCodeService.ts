import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export interface QRCode {
  id: number;
  data: string;
  created_at?: string;
  updated_at?: string;
}

export const getQRCodes = () => {
  return axios.get<QRCode[]>(`${API_BASE_URL}/qr-codes`);
};

export const getQRCodeById = (id: number) => {
  return axios.get<QRCode>(`${API_BASE_URL}/qr-codes/${id}`);
};

export const createQRCode = (
  qrCode: Omit<QRCode, "id" | "created_at" | "updated_at">
) => {
  return axios.post<QRCode>(`${API_BASE_URL}/qr-codes`, qrCode);
};

export const deleteQRCode = (id: number) => {
  return axios.delete(`${API_BASE_URL}/qr-codes/${id}`);
};

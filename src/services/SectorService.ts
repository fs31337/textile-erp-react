import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export interface Sector {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export const getSectors = () => {
  return axios.get<Sector[]>(`${API_BASE_URL}/sector`);
};

export const getSectorById = (id: number) => {
  return axios.get<Sector>(`${API_BASE_URL}/sector/${id}`);
};

export const createSector = (
  sector: Omit<Sector, "id" | "created_at" | "updated_at">
) => {
  return axios.post<Sector>(`${API_BASE_URL}/sector`, sector);
};

export const updateSector = (
  id: number,
  sector: Omit<Sector, "id" | "created_at" | "updated_at">
) => {
  return axios.put<Sector>(`${API_BASE_URL}/sector/${id}`, sector);
};

export const deleteSector = (id: number) => {
  return axios.delete(`${API_BASE_URL}/sector/${id}`);
};

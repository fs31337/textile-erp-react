import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export interface Material {
  id: number;
  name: string;
  description?: string;
  current_stock: number;
  unit_of_measure: string;
  cost: number;
  created_at?: string;
  updated_at?: string;
}

export const getMaterials = () => {
  return axios.get<Material[]>(`${API_BASE_URL}/materials`);
};

export const getMaterialById = (id: number) => {
  return axios.get<Material>(`${API_BASE_URL}/materials/${id}`);
};

export const createMaterial = (
  material: Omit<Material, "id" | "created_at" | "updated_at">
) => {
  return axios.post<Material>(`${API_BASE_URL}/materials`, material);
};

export const updateMaterial = (
  id: number,
  material: Omit<Material, "id" | "created_at" | "updated_at">
) => {
  return axios.put<Material>(`${API_BASE_URL}/materials/${id}`, material);
};

export const deleteMaterial = (id: number) => {
  return axios.delete(`${API_BASE_URL}/materials/${id}`);
};

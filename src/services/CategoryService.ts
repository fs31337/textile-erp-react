import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export const getCategories = () => {
  return axios.get<Category[]>(`${API_BASE_URL}/categories`);
};

export const getCategoryById = (id: number) => {
  return axios.get<Category>(`${API_BASE_URL}/categories/${id}`);
};

export const createCategory = (
  category: Omit<Category, "id" | "created_at" | "updated_at">
) => {
  return axios.post<Category>(`${API_BASE_URL}/categories`, category);
};

export const updateCategory = (
  id: number,
  category: Omit<Category, "id" | "created_at" | "updated_at">
) => {
  return axios.put<Category>(`${API_BASE_URL}/categories/${id}`, category);
};

export const deleteCategory = (id: number) => {
  return axios.delete(`${API_BASE_URL}/categories/${id}`);
};

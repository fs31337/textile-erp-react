import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export interface Category {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get<Category[]>(`${API_BASE_URL}/categories`);
  return response.data;
};

export const getCategoryById = async (id: number): Promise<Category> => {
  const response = await axios.get<Category>(
    `${API_BASE_URL}/categories/${id}`
  );
  return response.data;
};

export const createCategory = async (
  category: Omit<Category, "id" | "created_at" | "updated_at">
): Promise<Category> => {
  const response = await axios.post<Category>(
    `${API_BASE_URL}/categories`,
    category
  );
  return response.data;
};

export const updateCategory = async (
  id: number,
  category: Omit<Category, "id" | "created_at" | "updated_at">
): Promise<Category> => {
  const response = await axios.put<Category>(
    `${API_BASE_URL}/categories/${id}`,
    category
  );
  return response.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/categories/${id}`);
};

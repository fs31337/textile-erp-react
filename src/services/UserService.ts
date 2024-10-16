import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export interface User {
  id: number;
  name: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

export const getUsers = () => {
  return axios.get<User[]>(`${API_BASE_URL}/users`);
};

export const getUserById = (id: number) => {
  return axios.get<User>(`${API_BASE_URL}/users/${id}`);
};

export const createUser = (
  user: Omit<User, "id" | "created_at" | "updated_at">
) => {
  return axios.post<User>(`${API_BASE_URL}/users`, user);
};

export const updateUser = (
  id: number,
  user: Omit<User, "id" | "created_at" | "updated_at">
) => {
  return axios.put<User>(`${API_BASE_URL}/users/${id}`, user);
};

export const deleteUser = (id: number) => {
  return axios.delete(`${API_BASE_URL}/users/${id}`);
};

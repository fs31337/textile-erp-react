import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export interface Customer {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
}

export const getCustomers = () => {
  return axios.get<Customer[]>(`${API_BASE_URL}/customers`);
};

export const getCustomerById = (id: number) => {
  return axios.get<Customer>(`${API_BASE_URL}/customers/${id}`);
};

export const createCustomer = (
  customer: Omit<Customer, "id" | "created_at" | "updated_at">
) => {
  return axios.post<Customer>(`${API_BASE_URL}/customers`, customer);
};

export const updateCustomer = (
  id: number,
  customer: Omit<Customer, "id" | "created_at" | "updated_at">
) => {
  return axios.put<Customer>(`${API_BASE_URL}/customers/${id}`, customer);
};

export const deleteCustomer = (id: number) => {
  return axios.delete(`${API_BASE_URL}/customers/${id}`);
};

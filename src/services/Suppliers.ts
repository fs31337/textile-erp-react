import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export interface Supplier {
  id: number;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  category_id?: number;
  sector_id?: number;
  supplier_type_id?: number;
  website?: string;
  created_at?: string;
  updated_at?: string;
}

export const getSuppliers = () => {
  return axios.get<Supplier[]>(`${API_BASE_URL}/suppliers`);
};

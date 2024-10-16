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

// Obtener todos los proveedores
export const getSuppliers = () => {
  return axios.get<Supplier[]>(`${API_BASE_URL}/suppliers`);
};

// Obtener un proveedor específico por ID
export const getSupplierById = (id: number) => {
  return axios.get<Supplier>(`${API_BASE_URL}/suppliers/${id}`);
};

// Crear un nuevo proveedor
export const createSupplier = (
  supplier: Omit<Supplier, "id" | "created_at" | "updated_at">
) => {
  return axios.post<Supplier>(`${API_BASE_URL}/suppliers`, supplier);
};

// Actualizar un proveedor existente
export const updateSupplier = (
  id: number,
  supplier: Omit<Supplier, "id" | "created_at" | "updated_at">
) => {
  return axios.put<Supplier>(`${API_BASE_URL}/suppliers/${id}`, supplier);
};

// Eliminar un proveedor por ID
export const deleteSupplier = (id: number) => {
  return axios.delete(`${API_BASE_URL}/suppliers/${id}`);
};

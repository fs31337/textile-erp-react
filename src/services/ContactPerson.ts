import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export interface ContactPerson {
  id: number;
  supplier_id: number;
  name: string;
  phone?: string;
  email?: string;
  position?: string;
  created_at?: string;
  updated_at?: string;
}

// Obtener todas las personas de contacto
export const getContactPersons = () => {
  return axios.get<ContactPerson[]>(`${API_BASE_URL}/contact_persons`);
};

// Obtener una persona de contacto específica por ID
export const getContactPersonById = (id: number) => {
  return axios.get<ContactPerson>(`${API_BASE_URL}/contact_persons/${id}`);
};

// Crear una nueva persona de contacto
export const createContactPerson = (
  contactPerson: Omit<ContactPerson, "id" | "created_at" | "updated_at">
) => {
  return axios.post<ContactPerson>(
    `${API_BASE_URL}/contact_persons`,
    contactPerson
  );
};

// Actualizar una persona de contacto existente
export const updateContactPerson = (
  id: number,
  contactPerson: Omit<ContactPerson, "id" | "created_at" | "updated_at">
) => {
  return axios.put<ContactPerson>(
    `${API_BASE_URL}/contact_persons/${id}`,
    contactPerson
  );
};

// Eliminar una persona de contacto
export const deleteContactPerson = (id: number) => {
  return axios.delete(`${API_BASE_URL}/contact_persons/${id}`);
};

import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export interface Sector {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export const getSectors = async (): Promise<Sector[]> => {
  const response = await axios.get<Sector[]>(`${API_BASE_URL}/sector`);
  return response.data;
};

export const getSectorById = async (id: number): Promise<Sector> => {
  const response = await axios.get<Sector>(`${API_BASE_URL}/sector/${id}`);
  return response.data;
};

export const createSector = async (
  sector: Omit<Sector, "id" | "created_at" | "updated_at">
): Promise<Sector> => {
  const response = await axios.post<Sector>(`${API_BASE_URL}/sector`, sector);
  return response.data;
};

export const updateSector = async (
  id: number,
  sector: Omit<Sector, "id" | "created_at" | "updated_at">
): Promise<Sector> => {
  const response = await axios.put<Sector>(
    `${API_BASE_URL}/sector/${id}`,
    sector
  );
  return response.data;
};

export const deleteSector = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/sector/${id}`);
};

import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export interface MaterialStockMovement {
  id: number;
  material_id: number;
  quantity: number;
  movement_type: string;
  created_at?: string;
  updated_at?: string;
}

export const getMaterialStockMovements = () => {
  return axios.get<MaterialStockMovement[]>(`${API_BASE_URL}/materials/stock`);
};

export const getMaterialStockMovementById = (id: number) => {
  return axios.get<MaterialStockMovement>(
    `${API_BASE_URL}/materials/stock/${id}`
  );
};

export const createMaterialStockMovement = (
  movement: Omit<MaterialStockMovement, "id" | "created_at" | "updated_at">
) => {
  return axios.post<MaterialStockMovement>(
    `${API_BASE_URL}/materials/stock`,
    movement
  );
};

export const updateMaterialStockMovement = (
  id: number,
  movement: Omit<MaterialStockMovement, "id" | "created_at" | "updated_at">
) => {
  return axios.put<MaterialStockMovement>(
    `${API_BASE_URL}/materials/stock/${id}`,
    movement
  );
};

export const deleteMaterialStockMovement = (id: number) => {
  return axios.delete(`${API_BASE_URL}/materials/stock/${id}`);
};

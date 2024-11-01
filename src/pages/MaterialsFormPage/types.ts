export interface MaterialsData {
  name: string;
  description?: string;
  cost: number;
  current_stock: number;
  unit_of_measure: string;
}

export interface MaterialsFormPageProps {
  mode: "create" | "edit" | "view";
}

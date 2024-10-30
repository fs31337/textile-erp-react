export interface FinishedProductData {
  name: string;
  description?: string;
  price: number;
  current_stock: number;
}
export interface FinishedOrderFormPageProps {
  mode: "create" | "edit" | "view";
}

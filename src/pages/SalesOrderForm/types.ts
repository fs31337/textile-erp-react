export interface SalesOrderData {
  customer_id: number;
  total: number;
  status: string;
  date: string;
}
export interface SalesOrderFormPageProps {
  mode: "create" | "edit" | "view";
}

export interface PurchaseData {
  supplier_id: number;
  date: string;
  total: string;
}

export interface PurchaseFormPageProps {
  mode: "create" | "edit" | "view";
}

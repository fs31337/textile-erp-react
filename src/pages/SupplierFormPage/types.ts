export interface SupplierData {
  name: string;
  address: string;
  phone: string;
  email: string;
  category_id: number;
  sector_id: number;
  supplier_type_id: number;
  website?: string;
}

export interface SupplierFormPageProps {
  mode: "create" | "edit" | "view";
}

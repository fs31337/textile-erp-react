export interface ContactPersonData {
  supplier_id: number;
  name: string;
  phone?: string;
  email?: string;
  position?: string;
}

export interface ContactFormPageProps {
  mode: "create" | "edit" | "view";
}

export interface CustomerData {
  name: string;
  phone?: string;
  email?: string;
}

export interface CustomerFormPageProps {
  mode: "create" | "edit" | "view";
}

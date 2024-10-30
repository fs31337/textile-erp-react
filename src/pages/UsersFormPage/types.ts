export interface UserData {
  name: string;
  email: string;
  password: string;
}

export interface UserFormPageProps {
  mode: "create" | "edit" | "view";
}

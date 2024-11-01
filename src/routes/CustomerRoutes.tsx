import { Customers } from "../pages/Customers";
import { CustomerFormPage } from "../pages/CustomersFormPage";
import { RouteType } from "../types/routes";

export const customerRoutes: RouteType[] = [
  { path: "/clientes", element: <Customers /> },
  { path: "/clientes/new", element: <CustomerFormPage mode="create" /> },
  { path: "/clientes/edit/:id", element: <CustomerFormPage mode="edit" /> },
  { path: "/clientes/:id", element: <CustomerFormPage mode="view" /> },
];

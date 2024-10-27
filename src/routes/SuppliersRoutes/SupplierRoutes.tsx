import { RouteObject } from "react-router-dom";
import { SupplierFormPage } from "../../pages/SupplierFormPage";
import { SuppliersList } from "../../pages/Suppliers/components/SuppliersList";

export const SupplierRoutes: RouteObject[] = [
  { path: "/proveedores", element: <SuppliersList /> },
  { path: "/proveedores/new", element: <SupplierFormPage mode="create" /> },
  { path: "/proveedores/edit/:id", element: <SupplierFormPage mode="edit" /> },
  { path: "/proveedores/:id", element: <SupplierFormPage mode="view" /> },
];

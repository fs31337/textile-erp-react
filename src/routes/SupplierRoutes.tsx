import { SupplierFormPage } from "../pages/SupplierFormPage";
import { Suppliers } from "../pages/Suppliers";
import { RouteType } from "../types/routes";

export const supplierRoutes: RouteType[] = [
  { path: "/proveedores", element: <Suppliers /> },
  { path: "/proveedores/new", element: <SupplierFormPage mode="create" /> },
  { path: "/proveedores/edit/:id", element: <SupplierFormPage mode="edit" /> },
  { path: "/proveedores/:id", element: <SupplierFormPage mode="view" /> },
];

import { SalesOrder } from "../pages/SalesOrder";
import { SalesOrderFormPage } from "../pages/SalesOrderForm";
import { RouteType } from "../types/routes";

export const salesOrderRoutes: RouteType[] = [
  { path: "/ventas", element: <SalesOrder /> },
  { path: "/ventas/new", element: <SalesOrderFormPage mode="create" /> },
  { path: "/ventas/edit/:id", element: <SalesOrderFormPage mode="edit" /> },
  { path: "/ventas/:id", element: <SalesOrderFormPage mode="view" /> },
];

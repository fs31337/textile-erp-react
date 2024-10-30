import { SalesOrder } from "../pages/SalesOrder";
import { SalesOrderForm } from "../pages/SalesOrderForm";
import { RouteType } from "../types/routes";

export const salesOrderRoutes: RouteType[] = [
  { path: "/ventas", element: <SalesOrder /> },
  { path: "/ventas/new", element: <SalesOrderForm mode="create" /> },
  { path: "/ventas/edit/:id", element: <SalesOrderForm mode="edit" /> },
  { path: "/ventas/:id", element: <SalesOrderForm mode="view" /> },
];

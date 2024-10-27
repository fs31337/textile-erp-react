import { RouteObject } from "react-router-dom";
import { Home } from "../pages/Home";
import { Settings } from "../pages/Settings";
import contactPersonRoutes from "./ContactPerson";
import { SupplierRoutes } from "./SuppliersRoutes";

const baseRoutes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/settings", element: <Settings /> },
];

const appRoutes: RouteObject[] = [
  ...baseRoutes,
  ...SupplierRoutes,
  ...contactPersonRoutes,
];

export default appRoutes;

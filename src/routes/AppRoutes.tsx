import { Home } from "../pages/Home";
import { Settings } from "../pages/Settings";
import { contactPersonRoutes } from "./ContactPerson";
import { supplierRoutes } from "./SupplierRoutes";
import { RouteType } from "../types/routes";
import { customerRoutes } from "./CustomerRoutes";
import { purchasesRoutes } from "./Purchases";
import { categoriesRoutes } from "./Categories";
import { userRoutes } from "./Users";

const baseRoutes: RouteType[] = [
  { path: "/", element: <Home /> },
  { path: "/settings", element: <Settings /> },
];

export const appRoutes: RouteType[] = [
  ...baseRoutes,
  ...supplierRoutes,
  ...contactPersonRoutes,
  ...customerRoutes,
  ...purchasesRoutes,
  ...categoriesRoutes,
  ...userRoutes,
];

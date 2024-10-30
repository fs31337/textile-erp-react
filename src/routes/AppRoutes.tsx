import { Settings } from "../pages/Settings";
import { contactPersonRoutes } from "./ContactPerson";
import { supplierRoutes } from "./SupplierRoutes";
import { RouteType } from "../types/routes";
import { customerRoutes } from "./CustomerRoutes";
import { purchasesRoutes } from "./Purchases";
import { categoriesRoutes } from "./Categories";
import { userRoutes } from "./Users";
import { finishedProductsRoutes } from "./FinishedProducts";
import { qrScanRoutes } from "./QRScan";
import { salesOrderRoutes } from "./SalesOrder";
import { DashboardPage } from "../pages/DashBoard";

const baseRoutes: RouteType[] = [
  { path: "/", element: <DashboardPage /> },
  { path: "/dashboard", element: <DashboardPage /> },
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
  ...finishedProductsRoutes,
  ...qrScanRoutes,
  ...salesOrderRoutes,
];

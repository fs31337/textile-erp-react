import { Purchases } from "../pages/Purchases";
import { PurchaseFormPage } from "../pages/PurchasesFormPage";
import { RouteType } from "../types/routes";

export const purchasesRoutes: RouteType[] = [
  { path: "/compras", element: <Purchases /> },
  { path: "/compras/new", element: <PurchaseFormPage mode="create" /> },
  { path: "/compras/edit/:id", element: <PurchaseFormPage mode="edit" /> },
  { path: "/compras/:id", element: <PurchaseFormPage mode="view" /> },
];

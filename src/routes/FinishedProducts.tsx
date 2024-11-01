import { FinishedProducts } from "../pages/FinishedProducts";
import { FinishedProductFormPage } from "../pages/FinishedProductsFormPage/FinishedProductsFormPage";
import { RouteType } from "../types/routes";

export const finishedProductsRoutes: RouteType[] = [
  { path: "/productos-finalizados", element: <FinishedProducts /> },
  {
    path: "/productos-finalizados/new",
    element: <FinishedProductFormPage mode="create" />,
  },
  {
    path: "/productos-finalizados/edit/:id",
    element: <FinishedProductFormPage mode="edit" />,
  },
  {
    path: "/productos-finalizados/:id",
    element: <FinishedProductFormPage mode="view" />,
  },
];

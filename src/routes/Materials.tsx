import { Materials } from "../pages/Materials";
import { MaterialFormPage } from "../pages/MaterialsFormPage";
import { RouteType } from "../types/routes";

export const materialsRoutes: RouteType[] = [
  { path: "/materiales", element: <Materials /> },
  { path: "/materiales/new", element: <MaterialFormPage mode="create" /> },
  { path: "/materiales/edit/:id", element: <MaterialFormPage mode="edit" /> },
  { path: "/materiales/:id", element: <MaterialFormPage mode="view" /> },
];

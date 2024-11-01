import { Categories } from "../pages/Categories";
import { CategoryFormPage } from "../pages/CategoryFormPage";
import { RouteType } from "../types/routes";

export const categoriesRoutes: RouteType[] = [
  { path: "/categorias", element: <Categories /> },
  { path: "/categorias/new", element: <CategoryFormPage mode="create" /> },
  { path: "/categorias/edit/:id", element: <CategoryFormPage mode="edit" /> },
  { path: "/categorias/:id", element: <CategoryFormPage mode="view" /> },
];

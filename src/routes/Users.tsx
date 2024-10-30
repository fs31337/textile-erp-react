import { Users } from "../pages/Users";
import { UserFormPage } from "../pages/UsersFormPage";
import { RouteType } from "../types/routes";

export const userRoutes: RouteType[] = [
  { path: "/usuarios", element: <Users /> },
  { path: "/usuarios/new", element: <UserFormPage mode="create" /> },
  { path: "/usuarios/edit/:id", element: <UserFormPage mode="edit" /> },
  { path: "/usuarios/:id", element: <UserFormPage mode="view" /> },
];

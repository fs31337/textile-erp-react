import { ContactsFormPage } from "../pages/ContactFormPage";
import { ContactPerson } from "../pages/ContactPerson";
import { RouteType } from "../types/routes";

export const contactPersonRoutes: RouteType[] = [
  { path: "/contactos", element: <ContactPerson /> },
  { path: "/contactos/new", element: <ContactsFormPage mode="create" /> },
  { path: "/contactos/edit/:id", element: <ContactsFormPage mode="edit" /> },
  { path: "/contactos/:id", element: <ContactsFormPage mode="view" /> },
];

import React from "react";
import { Typography } from "@mui/material";
import { ContactPersonList } from "./components/ContactPersonList";

export const ContactPerson: React.FC = () => {
  return (
    <div className="mt-6 flex flex-col space-y-4">
      <Typography variant="h4" className="text-gray-800 mb-4">
        Listado de Personas de Contacto
      </Typography>
      <ContactPersonList />
    </div>
  );
};

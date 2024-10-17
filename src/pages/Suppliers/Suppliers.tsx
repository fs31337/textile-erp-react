import React from "react";
import { SuppliersList } from "./components/SuppliersList";
import { Typography } from "@mui/material";

export const Suppliers: React.FC = () => {
  return (
    <div className="mt-6 flex flex-col space-y-4">
      <Typography variant="h4" className="text-gray-800 mb-4">
        Listado de Proveedores
      </Typography>
      <SuppliersList />
    </div>
  );
};

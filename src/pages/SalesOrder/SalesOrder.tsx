import React from "react";
import { Typography } from "@mui/material";
import { SalesOrdersList } from "./componets/SalesOrderList";

export const SalesOrder: React.FC = () => {
  return (
    <div className="mt-6 flex flex-col space-y-4">
      <Typography variant="h4" className="text-gray-800 mb-4">
        Listado de Ordenes de Compra
      </Typography>
      <SalesOrdersList />
    </div>
  );
};

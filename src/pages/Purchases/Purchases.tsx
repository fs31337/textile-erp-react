import React from "react";
import { Typography } from "@mui/material";
import PurchaseList from "./components/PurchaseList";

export const Purchases: React.FC = () => {
  return (
    <div className="mt-6 flex flex-col space-y-4">
      <Typography variant="h4" className="text-gray-800 mb-4">
        Listado de Compras
      </Typography>
      <PurchaseList />
    </div>
  );
};

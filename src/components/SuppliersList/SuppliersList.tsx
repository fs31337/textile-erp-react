// src/pages/SuppliersList.tsx
import React from "react";
import useSuppliers from "../../hooks/useSuppliers";
import { Supplier } from "../../services/Suppliers"; // Importamos el tipo Supplier desde el servicio
import { DataTable } from "../DataTable";

export const SuppliersList: React.FC = () => {
  const { suppliers, loading, error } = useSuppliers();

  // Definimos las columnas con los accesores tipados
  const columns = [
    { label: "ID", accessor: "id" as keyof Supplier },
    { label: "Nombre", accessor: "name" as keyof Supplier },
    { label: "Dirección", accessor: "address" as keyof Supplier },
    { label: "Teléfono", accessor: "phone" as keyof Supplier },
    { label: "Email", accessor: "email" as keyof Supplier },
  ];

  return (
    <DataTable<Supplier>
      columns={columns}
      data={suppliers}
      isLoading={loading}
      error={error ? error.message : undefined}
    />
  );
};

import React from "react";
import { useNavigate } from "react-router-dom";
import useSuppliers from "../../../../hooks/useSuppliers";
import { Supplier } from "../../../../services/Suppliers";
import { DataTable } from "../../../../components/DataTable";
import Button from "@mui/material/Button";

export const SuppliersList: React.FC = () => {
  const { suppliers, loading, error, removeSupplier } = useSuppliers();
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate("/suppliers/new");
  };

  const handleEdit = (supplier: Supplier) => {
    navigate(`/suppliers/edit/${supplier.id}`);
  };

  const handleViewDetails = (supplier: Supplier) => {
    navigate(`/suppliers/${supplier.id}`);
  };

  const handleDelete = (supplier: Supplier) => {
    removeSupplier(supplier.id);
  };

  const columns = [
    { label: "ID", accessor: "id" as keyof Supplier },
    { label: "Nombre", accessor: "name" as keyof Supplier },
    { label: "Dirección", accessor: "address" as keyof Supplier },
    { label: "Teléfono", accessor: "phone" as keyof Supplier },
    { label: "Email", accessor: "email" as keyof Supplier },
  ];

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleCreateClick}>
        Crear Proveedor
      </Button>

      <DataTable<Supplier>
        columns={columns}
        data={suppliers}
        isLoading={loading}
        error={error ? error.message : undefined}
        onEdit={handleEdit}
        onViewDetails={handleViewDetails}
        onDelete={handleDelete}
      />
    </div>
  );
};

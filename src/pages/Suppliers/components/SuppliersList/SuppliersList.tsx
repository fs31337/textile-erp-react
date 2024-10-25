import React from "react";
import { useNavigate } from "react-router-dom";
import { useSuppliers } from "../../hooks/useSuppliers";
import { Supplier } from "../../../../services/Suppliers";
import { SearchBar } from "../../../../components/SearchBar";
import { PaginatedTable } from "../../../../components/PaginatedTable";
import Button from "@mui/material/Button";
import { useTableControls } from "../../../../hooks/useTableControls";

export const SuppliersList: React.FC = () => {
  const { suppliers, loading, error, removeSupplier } = useSuppliers();
  const navigate = useNavigate();

  const columns = [
    { label: "ID", accessor: "id" as keyof Supplier },
    { label: "Nombre", accessor: "name" as keyof Supplier },
    { label: "Dirección", accessor: "address" as keyof Supplier },
    { label: "Teléfono", accessor: "phone" as keyof Supplier },
    { label: "Email", accessor: "email" as keyof Supplier },
  ];

  const {
    searchText,
    setSearchText,
    paginatedData,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    filteredCount,
  } = useTableControls(suppliers, {
    columns: columns.map((col) => col.accessor),
  });

  const handleCreateClick = () => {
    navigate("/proveedores/new");
  };

  const handleEdit = (supplier: Supplier) => {
    navigate(`/proveedores/edit/${supplier.id}`);
  };

  const handleViewDetails = (supplier: Supplier) => {
    navigate(`/proveedores/${supplier.id}`);
  };

  const handleDelete = (supplier: Supplier) => {
    removeSupplier(supplier.id);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleCreateClick}>
        Crear Proveedor
      </Button>

      <SearchBar
        searchText={searchText}
        onSearchChange={(text) => {
          setSearchText(text);
          handleChangePage(null, 0);
        }}
      />

      <PaginatedTable<Supplier>
        columns={columns}
        data={paginatedData}
        totalItems={filteredCount}
        page={page}
        rowsPerPage={rowsPerPage}
        isLoading={loading}
        error={error ? error.message : undefined}
        onEdit={handleEdit}
        onViewDetails={handleViewDetails}
        onDelete={handleDelete}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

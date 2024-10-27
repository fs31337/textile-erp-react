import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../../services/CustomerService";
import { useCustomers } from "../hooks/useCustomers";
import { useTableControls } from "../../../hooks/useTableControls";
import { SearchBar } from "../../../components/SearchBar";
import { PaginatedTable } from "../../../components/PaginatedTable";

export const CustomerList: React.FC = () => {
  const navigate = useNavigate();
  const { customers, loading, error, removeCustomer } = useCustomers();

  const columns = [
    { label: "ID", accessor: "id" as keyof Customer },
    { label: "Nombre", accessor: "name" as keyof Customer },
    { label: "Teléfono", accessor: "phone" as keyof Customer },
    { label: "Email", accessor: "email" as keyof Customer },
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
  } = useTableControls(customers, {
    columns: columns.map((col) => col.accessor),
  });

  const handleCreateClick = () => {
    navigate("/clientes/new");
  };

  const handleEdit = (customer: Customer) => {
    navigate(`/clientes/edit/${customer.id}`);
  };

  const handleViewDetails = (customer: Customer) => {
    navigate(`/clientes/${customer.id}`);
  };

  const handleDelete = (customer: Customer) => {
    removeCustomer(customer.id);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleCreateClick}>
        Crear Cliente
      </Button>

      <SearchBar
        searchText={searchText}
        onSearchChange={(text) => {
          setSearchText(text);
          handleChangePage(null, 0);
        }}
      />

      <PaginatedTable<Customer>
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

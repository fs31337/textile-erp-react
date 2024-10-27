import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../../../../components/SearchBar";
import { PaginatedTable } from "../../../../components/PaginatedTable";
import { useTableControls } from "../../../../hooks/useTableControls";
import { ContactPerson } from "../../../../services/ContactPerson";
import { useContactPerson } from "../../hooks/useContactPerson";

export const ContactPersonList: React.FC = () => {
  const navigate = useNavigate();
  const { contactPerson, loading, error, removeContactPerson } =
    useContactPerson();
  const columns = [
    { label: "ID", accessor: "id" as keyof ContactPerson },
    { label: "Nombre", accessor: "name" as keyof ContactPerson },
    { label: "Dirección", accessor: "address" as keyof ContactPerson },
    { label: "Teléfono", accessor: "phone" as keyof ContactPerson },
    { label: "Email", accessor: "email" as keyof ContactPerson },
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
  } = useTableControls(contactPerson, {
    columns: columns.map((col) => col.accessor),
  });

  const handleCreateClick = () => {
    navigate("/contact_persons/new");
  };

  const handleEdit = (contactPerson: ContactPerson) => {
    navigate(`/contact_person/edit/${contactPerson.id}`);
  };

  const handleViewDetails = (contactPerson: ContactPerson) => {
    navigate(`/contact_persons/${contactPerson.id}`);
  };

  const handleDelete = (contactPerson: ContactPerson) => {
    removeContactPerson(contactPerson.id);
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

      <PaginatedTable<ContactPerson>
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

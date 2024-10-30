import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../../../components/SearchBar";
import { PaginatedTable } from "../../../components/PaginatedTable";
import { useTableControls } from "../../../hooks/useTableControls";
import { useUsers } from "../hooks/useUsers";
import { User } from "../../../services/UserService";

export const UsersList: React.FC = () => {
  const { users, loading, error, removeUser } = useUsers();
  const navigate = useNavigate();

  const columns = [
    { label: "ID", accessor: "id" as keyof User },
    { label: "Nombre", accessor: "name" as keyof User },
    { label: "Email", accessor: "email" as keyof User },
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
  } = useTableControls(users, {
    columns: columns.map((col) => col.accessor),
  });

  const handleCreateClick = () => {
    navigate("/usuarios/new");
  };

  const handleEdit = (user: User) => {
    navigate(`/usuarios/edit/${user.id}`);
  };

  const handleViewDetails = (user: User) => {
    navigate(`/usuarios/${user.id}`);
  };

  const handleDelete = (user: User) => {
    removeUser(user.id);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleCreateClick}>
        Crear Usuario
      </Button>

      <SearchBar
        searchText={searchText}
        onSearchChange={(text) => {
          setSearchText(text);
          handleChangePage(null, 0);
        }}
      />

      <PaginatedTable<User>
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

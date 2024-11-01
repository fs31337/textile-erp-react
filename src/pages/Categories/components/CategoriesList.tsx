import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Category } from "../../../services/CategoryService";
import { useTableControls } from "../../../hooks/useTableControls";
import { SearchBar } from "../../../components/SearchBar";
import { PaginatedTable } from "../../../components/PaginatedTable";
import { useCategories } from "../hooks/useCategories";

export const CategoriesList: React.FC = () => {
  const { categories, loading, error, removeCategory } = useCategories();
  const navigate = useNavigate();

  const columns = [
    { label: "ID", accessor: "id" as keyof Category },
    { label: "Nombre", accessor: "name" as keyof Category },
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
  } = useTableControls(categories, {
    columns: columns.map((col) => col.accessor),
  });

  const handleCreateClick = () => {
    navigate("/categorias/new");
  };

  const handleEdit = (category: Category) => {
    navigate(`/categorias/edit/${category.id}`);
  };

  const handleViewDetails = (category: Category) => {
    navigate(`/categorias/${category.id}`);
  };

  const handleDelete = (category: Category) => {
    removeCategory(category.id);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleCreateClick}>
        Crear Categoría
      </Button>

      <SearchBar
        searchText={searchText}
        onSearchChange={(text) => {
          setSearchText(text);
          handleChangePage(null, 0);
        }}
      />

      <PaginatedTable<Category>
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

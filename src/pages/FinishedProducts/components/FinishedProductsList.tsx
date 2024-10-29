import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../../../components/SearchBar";
import { PaginatedTable } from "../../../components/PaginatedTable";
import { useTableControls } from "../../../hooks/useTableControls";
import { useFinishedProducts } from "../hooks/useFinishedProducts";
import { FinishedProduct } from "../../../services/FinishedProductService";

export const FinishedProductsList: React.FC = () => {
  const { finishedProducts, loading, error, removeFinishedProduct } =
    useFinishedProducts();
  const navigate = useNavigate();

  const columns = [
    { label: "ID", accessor: "id" as keyof FinishedProduct },
    { label: "Nombre", accessor: "name" as keyof FinishedProduct },
    { label: "Descripción", accessor: "description" as keyof FinishedProduct },
    { label: "Precio", accessor: "price" as keyof FinishedProduct },
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
  } = useTableControls(finishedProducts, {
    columns: columns.map((col) => col.accessor),
  });

  const handleCreateClick = () => {
    navigate("/productos-finalizados/new");
  };

  const handleEdit = (product: FinishedProduct) => {
    navigate(`/productos-finalizados/edit/${product.id}`);
  };

  const handleViewDetails = (product: FinishedProduct) => {
    navigate(`/productos-finalizados/${product.id}`);
  };

  const handleDelete = (product: FinishedProduct) => {
    removeFinishedProduct(product.id);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleCreateClick}>
        Crear Producto
      </Button>

      <SearchBar
        searchText={searchText}
        onSearchChange={(text) => {
          setSearchText(text);
          handleChangePage(null, 0);
        }}
      />

      <PaginatedTable<FinishedProduct>
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

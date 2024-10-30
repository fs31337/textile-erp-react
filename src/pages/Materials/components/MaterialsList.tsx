import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Material } from "../../../services/MaterialService";
import { useTableControls } from "../../../hooks/useTableControls";
import { SearchBar } from "../../../components/SearchBar";
import { PaginatedTable } from "../../../components/PaginatedTable";
import { useMaterials } from "../hooks/useMaterials";

export const MaterialList: React.FC = () => {
  const navigate = useNavigate();
  const { materials, loading, error, removeMaterial } = useMaterials();

  const columns = [
    { label: "ID", accessor: "id" as keyof Material },
    { label: "Nombre", accessor: "name" as keyof Material },
    { label: "Descripción", accessor: "description" as keyof Material },
    { label: "Costo", accessor: "cost" as keyof Material },
    { label: "Stock Actual", accessor: "current_stock" as keyof Material },
    {
      label: "Unidad de Medida",
      accessor: "unit_of_measure" as keyof Material,
    },
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
  } = useTableControls(materials, {
    columns: columns.map((col) => col.accessor),
  });

  const handleCreateClick = () => {
    navigate("/materiales/new");
  };

  const handleEdit = (material: Material) => {
    navigate(`/materiales/edit/${material.id}`);
  };

  const handleViewDetails = (material: Material) => {
    navigate(`/materiales/${material.id}`);
  };

  const handleDelete = (material: Material) => {
    removeMaterial(material.id);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleCreateClick}>
        Crear Material
      </Button>

      <SearchBar
        searchText={searchText}
        onSearchChange={(text) => {
          setSearchText(text);
          handleChangePage(null, 0);
        }}
      />

      <PaginatedTable<Material>
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

export default MaterialList;

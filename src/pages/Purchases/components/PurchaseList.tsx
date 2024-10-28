import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { usePurchases } from "../hooks/usePurchases";
import { Purchase } from "../../../services/PurchaseService";
import { useTableControls } from "../../../hooks/useTableControls";
import { SearchBar } from "../../../components/SearchBar";
import { PaginatedTable } from "../../../components/PaginatedTable";

export const PurchaseList: React.FC = () => {
  const navigate = useNavigate();
  const { purchases, loading, error, removePurchase } = usePurchases();
  const columns = [
    { label: "ID", accessor: "id" as keyof Purchase },
    { label: "ID Proveedor", accessor: "supplier_id" as keyof Purchase },
    { label: "Fecha", accessor: "date" as keyof Purchase },
    { label: "Total", accessor: "total" as keyof Purchase },
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
  } = useTableControls(purchases, {
    columns: columns.map((col) => col.accessor),
  });

  const handleCreateClick = () => {
    navigate("/compras/new");
  };

  const handleEdit = (purchase: Purchase) => {
    navigate(`/compras/edit/${purchase.id}`);
  };

  const handleViewDetails = (purchase: Purchase) => {
    navigate(`/compras/${purchase.id}`);
  };

  const handleDelete = (purchase: Purchase) => {
    removePurchase(purchase.id);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleCreateClick}>
        Crear Compra
      </Button>

      <SearchBar
        searchText={searchText}
        onSearchChange={(text) => {
          setSearchText(text);
          handleChangePage(null, 0);
        }}
      />

      <PaginatedTable<Purchase>
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

export default PurchaseList;

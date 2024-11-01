import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../../../components/SearchBar";
import { PaginatedTable } from "../../../components/PaginatedTable";
import { useTableControls } from "../../../hooks/useTableControls";
import { SalesOrder } from "../../../services/SalesOrderService";
import { useSalesOrders } from "../hooks/useSalesOrder";

export const SalesOrdersList: React.FC = () => {
  const { salesOrders, loading, error, removeOrder } = useSalesOrders();
  const navigate = useNavigate();

  const columns = [
    { label: "ID", accessor: "id" as keyof SalesOrder },
    { label: "Cliente", accessor: "customer_id" as keyof SalesOrder },
    { label: "Total", accessor: "total" as keyof SalesOrder },
    { label: "Estado", accessor: "status" as keyof SalesOrder },
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
  } = useTableControls(salesOrders, {
    columns: columns.map((col) => col.accessor),
  });

  const handleCreateClick = () => {
    navigate("/ventas/new");
  };

  const handleEdit = (order: SalesOrder) => {
    navigate(`/ventas/edit/${order.id}`);
  };

  const handleViewDetails = (order: SalesOrder) => {
    navigate(`/ventas/${order.id}`);
  };

  const handleDelete = (order: SalesOrder) => {
    removeOrder(order.id);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleCreateClick}>
        Crear Orden de Venta
      </Button>

      <SearchBar
        searchText={searchText}
        onSearchChange={(text) => {
          setSearchText(text);
          handleChangePage(null, 0);
        }}
      />

      <PaginatedTable<SalesOrder>
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

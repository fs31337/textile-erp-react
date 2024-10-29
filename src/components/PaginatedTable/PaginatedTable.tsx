import React from "react";
import TablePagination from "@mui/material/TablePagination";
import { DataTable } from "../DataTable";

interface Column<T> {
  label: string;
  accessor: keyof T;
}

interface PaginatedTableProps<T> {
  columns: Column<T>[];
  data: T[];
  totalItems: number;
  page: number;
  rowsPerPage: number;
  isLoading?: boolean;
  error?: string;
  onEdit?: (item: T) => void;
  onViewDetails?: (item: T) => void;
  onDelete?: (item: T) => void;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PaginatedTable = <T,>({
  columns,
  data,
  totalItems,
  page,
  rowsPerPage,
  isLoading,
  error,
  onEdit,
  onViewDetails,
  onDelete,
  onPageChange,
  onRowsPerPageChange,
}: PaginatedTableProps<T>) => {
  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        error={error}
        onEdit={onEdit}
        onViewDetails={onViewDetails}
        onDelete={onDelete}
      />
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </>
  );
};

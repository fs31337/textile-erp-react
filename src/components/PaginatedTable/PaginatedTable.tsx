import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Paginated Table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.label} align="left">
                {column.label}
              </TableCell>
            ))}
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.label} align="left">
                  {row[column.accessor] as React.ReactNode}
                </TableCell>
              ))}
              <TableCell align="center">
                <IconButton
                  color="primary"
                  onClick={() => onViewDetails && onViewDetails(row)}
                >
                  <VisibilityIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => onEdit && onEdit(row)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => onDelete && onDelete(row)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </TableContainer>
  );
};

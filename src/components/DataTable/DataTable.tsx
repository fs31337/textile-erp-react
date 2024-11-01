import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ConfirmationDialog } from "./components/ConfirmationDialog";

interface Column<T> {
  label: string;
  accessor: keyof T;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  error?: string;
  onEdit?: (item: T) => void;
  onViewDetails?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export const DataTable = <T,>({
  columns,
  data,
  isLoading,
  error,
  onEdit,
  onViewDetails,
  onDelete,
}: DataTableProps<T>) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const handleDeleteClick = (item: T) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    if (selectedItem && onDelete) {
      onDelete(selectedItem);
    }
    setOpenDialog(false);
    setSelectedItem(null);
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="Reusable Data Table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.label} align="center">
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
                  <TableCell key={column.label} align="center">
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
                    onClick={() => handleDeleteClick(row)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmationDialog
        open={openDialog}
        title="Confirmar Eliminación"
        description="¿Estás seguro de que deseas eliminar este elemento?"
        onConfirm={confirmDelete}
        onCancel={() => setOpenDialog(false)}
      />
    </>
  );
};

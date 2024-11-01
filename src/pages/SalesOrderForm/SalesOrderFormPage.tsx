import React from "react";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  FormControl,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useSalesOrderForm } from "./hooks/useSalesOrderForm";
import { SalesOrderFormPageProps } from "./types";

export const SalesOrderFormPage: React.FC<SalesOrderFormPageProps> = ({
  mode,
}) => {
  const { control, handleSubmit, errors, isLoading, isViewMode, onSubmit } =
    useSalesOrderForm(mode);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="mt-6 max-w-lg mx-auto flex flex-col space-y-4 p-4 bg-white shadow-md rounded-md">
      <Typography variant="h4" className="text-gray-800 mb-4">
        {mode === "create" ? "Crear Orden de Venta" : "Editar Orden de Venta"}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <FormControl fullWidth margin="normal" error={!!errors.customer_id}>
          <Controller
            name="customer_id"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="ID del Cliente"
                type="number"
                error={!!errors.customer_id}
                helperText={errors.customer_id?.message}
                fullWidth
                disabled={isViewMode}
              />
            )}
          />
        </FormControl>

        <FormControl fullWidth margin="normal" error={!!errors.total}>
          <Controller
            name="total"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Total"
                type="number"
                error={!!errors.total}
                helperText={errors.total?.message}
                fullWidth
                disabled={isViewMode}
              />
            )}
          />
        </FormControl>

        <FormControl fullWidth margin="normal" error={!!errors.status}>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Estado"
                error={!!errors.status}
                helperText={errors.status?.message}
                fullWidth
                disabled={isViewMode}
              />
            )}
          />
        </FormControl>

        <FormControl fullWidth margin="normal" error={!!errors.date}>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Fecha"
                type="date"
                error={!!errors.date}
                helperText={errors.date?.message}
                fullWidth
                disabled={isViewMode}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </FormControl>

        <div className="flex justify-between mt-4">
          <Button
            variant="outlined"
            color="secondary"
            className="w-1/3"
            onClick={() => window.history.back()}
          >
            Volver
          </Button>

          {!isViewMode && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-1/2 bg-blue-500 hover:bg-blue-600"
            >
              {mode === "create" ? "Guardar" : "Guardar Cambios"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

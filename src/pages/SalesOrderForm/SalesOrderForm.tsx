import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { useSalesOrderForm } from "./hooks/useSalesOrderForm";
import { SalesOrderFormPageProps } from "./types";

export const SalesOrderForm: React.FC<SalesOrderFormPageProps> = ({ mode }) => {
  const { control, handleSubmit, errors, isLoading, isViewMode, onSubmit } =
    useSalesOrderForm(mode);

  if (isLoading) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Typography variant="h4" gutterBottom>
        {mode === "create" ? "Crear Orden de Venta" : "Editar Orden de Venta"}
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: "400px", width: "100%" }}
      >
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
              margin="normal"
              disabled={isViewMode}
            />
          )}
        />

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
              margin="normal"
              disabled={isViewMode}
            />
          )}
        />

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
              margin="normal"
              disabled={isViewMode}
            />
          )}
        />

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
              margin="normal"
              disabled={isViewMode}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />

        {!isViewMode && (
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {mode === "create" ? "Crear" : "Guardar Cambios"}
          </Button>
        )}
      </form>
    </Box>
  );
};

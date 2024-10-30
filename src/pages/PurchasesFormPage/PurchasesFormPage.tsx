import React from "react";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { PurchaseFormPageProps } from "./types";
import { usePurchaseForm } from "./hooks/usePurchaseForm";

export const PurchaseFormPage: React.FC<PurchaseFormPageProps> = ({ mode }) => {
  const {
    control,
    handleSubmit,
    errors,
    isLoading,
    suppliers,
    isViewMode,
    onSubmit,
  } = usePurchaseForm(mode);

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
        {mode === "create"
          ? "Crear Compra"
          : mode === "edit"
          ? "Editar Compra"
          : "Detalles de la Compra"}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <FormControl fullWidth margin="normal" error={!!errors.supplier_id}>
          <InputLabel>Proveedor</InputLabel>
          <Controller
            name="supplier_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                disabled={isViewMode}
                value={field.value || ""}
                onChange={field.onChange}
              >
                {suppliers.map((supplier) => (
                  <MenuItem key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <Typography color="error">{errors.supplier_id?.message}</Typography>
        </FormControl>

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
              margin="normal"
              InputLabelProps={{ shrink: true }}
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
              type="text"
              error={!!errors.total}
              helperText={errors.total?.message}
              fullWidth
              disabled={isViewMode}
              margin="normal"
            />
          )}
        />

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

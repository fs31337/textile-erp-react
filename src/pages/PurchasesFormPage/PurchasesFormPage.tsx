import React from "react";
import {
  TextField,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { PurchaseFormPageProps } from "./types";
import { usePurchaseForm } from "./hooks/usePurchaseForm";
import { FormContainer } from "../../components/FormContainer";
export const PurchaseFormPage: React.FC<PurchaseFormPageProps> = ({ mode }) => {
  const {
    control,
    handleSubmit,
    errors,
    isLoading,
    suppliers,
    isViewMode,
    onSubmit,
    isDirty,
  } = usePurchaseForm(mode);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  const title =
    mode === "create"
      ? "Crear Compra"
      : mode === "edit"
      ? "Editar Compra"
      : "Detalles de la Compra";

  return (
    <FormContainer
      title={title}
      isViewMode={isViewMode}
      onSave={handleSubmit(onSubmit)}
      isDirty={isDirty}
    >
      <form className="form-container">
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
      </form>
    </FormContainer>
  );
};

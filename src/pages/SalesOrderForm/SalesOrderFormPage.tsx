// SalesOrderFormPage.tsx
import React from "react";
import { TextField, CircularProgress, FormControl } from "@mui/material";
import { Controller } from "react-hook-form";
import { useSalesOrderForm } from "./hooks/useSalesOrderForm";
import { SalesOrderFormPageProps } from "./types";
import { FormContainer } from "../../components/FormContainer";

export const SalesOrderFormPage: React.FC<SalesOrderFormPageProps> = ({
  mode,
}) => {
  const {
    control,
    handleSubmit,
    errors,
    isLoading,
    isViewMode,
    onSubmit,
    isDirty,
  } = useSalesOrderForm(mode);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  const title =
    mode === "create"
      ? "Crear Orden de Venta"
      : mode === "edit"
      ? "Editar Orden de Venta"
      : "Detalles de Orden de venta";

  return (
    <FormContainer
      title={title}
      isViewMode={isViewMode}
      onSave={handleSubmit(onSubmit)}
      isDirty={isDirty}
    >
      <form className="form-container">
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
      </form>
    </FormContainer>
  );
};

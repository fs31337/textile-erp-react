import React from "react";
import { TextField, CircularProgress } from "@mui/material";
import { Controller } from "react-hook-form";
import { useFinishedProductForm } from "./hooks/useFinishedProductsForm";
import { FinishedOrderFormPageProps } from "./types";
import { FormContainer } from "../../components/FormContainer";
export const FinishedProductFormPage: React.FC<FinishedOrderFormPageProps> = ({
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
  } = useFinishedProductForm(mode);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  const title =
    mode === "create"
      ? "Crear Producto"
      : mode === "edit"
      ? "Editar Producto"
      : "Detalles del Producto";

  return (
    <FormContainer
      title={title}
      isViewMode={isViewMode}
      onSave={handleSubmit(onSubmit)}
      isDirty={isDirty}
    >
      <form className="form-container">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nombre"
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
              disabled={isViewMode}
              margin="normal"
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Descripción"
              error={!!errors.description}
              helperText={errors.description?.message}
              fullWidth
              disabled={isViewMode}
              margin="normal"
            />
          )}
        />

        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Precio"
              type="number"
              error={!!errors.price}
              helperText={errors.price?.message}
              fullWidth
              disabled={isViewMode}
              margin="normal"
            />
          )}
        />

        <Controller
          name="current_stock"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Stock Actual"
              type="number"
              error={!!errors.current_stock}
              helperText={errors.current_stock?.message}
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

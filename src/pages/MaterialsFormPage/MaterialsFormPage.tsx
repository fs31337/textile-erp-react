import React from "react";
import { TextField, CircularProgress, FormControl } from "@mui/material";
import { Controller } from "react-hook-form";
import { MaterialsFormPageProps } from "./types";
import { useMaterialForm } from "./hooks/useMaterialForm";
import { FormContainer } from "../../components/FormContainer";
export const MaterialFormPage: React.FC<MaterialsFormPageProps> = ({
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
  } = useMaterialForm(mode);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  const title =
    mode === "create"
      ? "Crear Material"
      : mode === "edit"
      ? "Editar Material"
      : "Detalles del Material";

  return (
    <FormContainer
      title={title}
      isViewMode={isViewMode}
      onSave={handleSubmit(onSubmit)}
      isDirty={isDirty}
    >
      <form className="form-container">
        <FormControl fullWidth margin="normal" error={!!errors.name}>
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
        </FormControl>

        <FormControl fullWidth margin="normal" error={!!errors.description}>
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
        </FormControl>

        <FormControl fullWidth margin="normal" error={!!errors.cost}>
          <Controller
            name="cost"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Costo"
                type="number"
                error={!!errors.cost}
                helperText={errors.cost?.message}
                fullWidth
                disabled={isViewMode}
                margin="normal"
              />
            )}
          />
        </FormControl>

        <FormControl fullWidth margin="normal" error={!!errors.current_stock}>
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
        </FormControl>

        <FormControl fullWidth margin="normal" error={!!errors.unit_of_measure}>
          <Controller
            name="unit_of_measure"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Unidad de Medida"
                error={!!errors.unit_of_measure}
                helperText={errors.unit_of_measure?.message}
                fullWidth
                disabled={isViewMode}
                margin="normal"
              />
            )}
          />
        </FormControl>
      </form>
    </FormContainer>
  );
};

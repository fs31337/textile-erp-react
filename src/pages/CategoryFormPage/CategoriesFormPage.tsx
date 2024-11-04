import React from "react";
import { TextField, CircularProgress } from "@mui/material";
import { CategoriesFormPageProps } from "./types";
import { useCategoryForm } from "./hooks/useCategoryForm";
import { Controller } from "react-hook-form";
import { FormContainer } from "../../components/FormContainer";

export const CategoryFormPage: React.FC<CategoriesFormPageProps> = ({
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
  } = useCategoryForm(mode);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  const title =
    mode === "create"
      ? "Crear Categoría"
      : mode === "edit"
      ? "Editar Categoría"
      : "Detalles de la Categoría";

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
      </form>
    </FormContainer>
  );
};

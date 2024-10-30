import React from "react";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CategoriesFormPageProps } from "./types";
import { useCategoryForm } from "./hooks/useCategoryForm";
import { Controller } from "react-hook-form";

export const CategoryFormPage: React.FC<CategoriesFormPageProps> = ({
  mode,
}) => {
  const navigate = useNavigate();
  const { control, handleSubmit, errors, isLoading, isViewMode, onSubmit } =
    useCategoryForm(mode);

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
          ? "Crear Categoría"
          : mode === "edit"
          ? "Editar Categoría"
          : "Detalles de la Categoría"}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
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

        <div className="flex justify-between mt-4">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate(-1)}
            className="w-1/3"
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

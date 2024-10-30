import React from "react";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";
import { useFinishedProductForm } from "./hooks/useFinishedProductsForm";
import { FinishedOrderFormPageProps } from "./types";

export const FinishedProductFormPage: React.FC<FinishedOrderFormPageProps> = ({
  mode,
}) => {
  const navigate = useNavigate();
  const { control, handleSubmit, errors, isLoading, isViewMode, onSubmit } =
    useFinishedProductForm(mode);

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
          ? "Crear Producto"
          : mode === "edit"
          ? "Editar Producto"
          : "Detalles del Producto"}
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

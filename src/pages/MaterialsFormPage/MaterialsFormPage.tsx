import React from "react";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  FormControl,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { MaterialsFormPageProps } from "./types";
import { useMaterialForm } from "./hooks/useMaterialForm";

export const MaterialFormPage: React.FC<MaterialsFormPageProps> = ({
  mode,
}) => {
  const { control, handleSubmit, errors, isLoading, isViewMode, onSubmit } =
    useMaterialForm(mode);

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
          ? "Crear Material"
          : mode === "edit"
          ? "Editar Material"
          : "Detalles del Material"}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
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

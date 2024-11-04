// SupplierFormPage.tsx
import React from "react";
import {
  TextField,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

import { SupplierFormPageProps } from "./types";
import { useSupplierForm } from "./hooks/useSupplierForm";
import { Controller } from "react-hook-form";
import { FormContainer } from "../../components/FormContainer";

export const SupplierFormPage: React.FC<SupplierFormPageProps> = ({ mode }) => {
  const {
    control,
    handleSubmit,
    errors,
    isLoading,
    loadingData,
    error,
    categories,
    sectors,
    supplierTypes,
    isViewMode,
    onSubmit,
    isDirty,
  } = useSupplierForm(mode);

  if (isLoading || loadingData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const title =
    mode === "create"
      ? "Crear Proveedor"
      : mode === "edit"
      ? "Editar Proveedor"
      : "Detalles del Proveedor";

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

        <FormControl fullWidth margin="normal" error={!!errors.category_id}>
          <InputLabel>Categoría</InputLabel>
          <Controller
            name="category_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                disabled={isViewMode}
                value={field.value || ""}
                onChange={field.onChange}
              >
                <MenuItem value="">
                  <em>Selecciona una categoría</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <Typography color="error">{errors.category_id?.message}</Typography>
        </FormControl>

        <FormControl fullWidth margin="normal" error={!!errors.sector_id}>
          <InputLabel>Sector</InputLabel>
          <Controller
            name="sector_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                disabled={isViewMode}
                value={field.value || ""}
                onChange={field.onChange}
              >
                <MenuItem value="">
                  <em>Selecciona un sector</em>
                </MenuItem>
                {sectors.map((sector) => (
                  <MenuItem key={sector.id} value={sector.id}>
                    {sector.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <Typography color="error">{errors.sector_id?.message}</Typography>
        </FormControl>

        <FormControl
          fullWidth
          margin="normal"
          error={!!errors.supplier_type_id}
        >
          <InputLabel>Tipo de Proveedor</InputLabel>
          <Controller
            name="supplier_type_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                disabled={isViewMode}
                value={field.value || ""}
                onChange={field.onChange}
              >
                <MenuItem value="">
                  <em>Selecciona un tipo</em>
                </MenuItem>
                {supplierTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <Typography color="error">
            {errors.supplier_type_id?.message}
          </Typography>
        </FormControl>

        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Dirección"
              error={!!errors.address}
              helperText={errors.address?.message}
              fullWidth
              disabled={isViewMode}
              margin="normal"
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Teléfono"
              error={!!errors.phone}
              helperText={errors.phone?.message}
              fullWidth
              disabled={isViewMode}
              margin="normal"
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              disabled={isViewMode}
              margin="normal"
            />
          )}
        />

        <Controller
          name="website"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Website"
              error={!!errors.website}
              helperText={errors.website?.message}
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

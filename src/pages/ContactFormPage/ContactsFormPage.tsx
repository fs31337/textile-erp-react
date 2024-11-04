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
import { ContactFormPageProps } from "./types";
import { useContactsForm } from "./hooks/useContactsForm";
import { FormContainer } from "../../components/FormContainer";

export const ContactsFormPage: React.FC<ContactFormPageProps> = ({ mode }) => {
  const {
    control,
    handleSubmit,
    errors,
    isLoading,
    suppliers,
    onSubmit,
    isViewMode,
    isDirty,
  } = useContactsForm(mode);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  const title =
    mode === "create"
      ? "Crear Contacto"
      : mode === "edit"
      ? "Editar Contacto"
      : "Detalles del Contacto";

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
          name="position"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Posición"
              error={!!errors.position}
              helperText={errors.position?.message}
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

import React from "react";
import { TextField, CircularProgress } from "@mui/material";
import { Controller } from "react-hook-form";
import { CustomerFormPageProps } from "./types";
import { useCustomerForm } from "./hooks/useCustomerForm";
import { FormContainer } from "../../components/FormContainer";

export const CustomerFormPage: React.FC<CustomerFormPageProps> = ({ mode }) => {
  const {
    control,
    handleSubmit,
    errors,
    isLoading,
    isViewMode,
    onSubmit,
    isDirty,
  } = useCustomerForm(mode);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  const title =
    mode === "create"
      ? "Crear Cliente"
      : mode === "edit"
      ? "Editar Cliente"
      : "Detalles del Cliente";

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
      </form>
    </FormContainer>
  );
};

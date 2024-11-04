// UserFormPage.tsx
import React from "react";
import { TextField, CircularProgress } from "@mui/material";
import { Controller } from "react-hook-form";
import { useUserForm } from "./hooks/useUsersForm";
import { UserFormPageProps } from "./types";
import { FormContainer } from "../../components/FormContainer";

export const UserFormPage: React.FC<UserFormPageProps> = ({ mode }) => {
  const { control, handleSubmit, errors, isLoading, isViewMode, onSubmit } =
    useUserForm(mode);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  const title =
    mode === "create"
      ? "Crear Usuario"
      : mode === "edit"
      ? "Editar Usuario"
      : "Detalles del Usuario";

  return (
    <FormContainer
      title={title}
      isViewMode={isViewMode}
      onSave={handleSubmit(onSubmit)}
      isDirty
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

        {!isViewMode && (
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Contraseña"
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
                margin="normal"
              />
            )}
          />
        )}
      </form>
    </FormContainer>
  );
};

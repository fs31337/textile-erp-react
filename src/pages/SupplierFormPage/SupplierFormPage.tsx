import React from "react";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import { useSupplierForm } from "./hooks/useSupplierForm";

interface SupplierFormPageProps {
  mode: "create" | "edit" | "view";
}

export const SupplierFormPage: React.FC<SupplierFormPageProps> = ({ mode }) => {
  const {
    supplierData,
    loading,
    error,
    handleInputChange,
    handleSave,
    isViewMode,
  } = useSupplierForm(mode);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <Typography variant="h4">
        {mode === "create"
          ? "Crear Proveedor"
          : mode === "edit"
          ? "Editar Proveedor"
          : "Detalles del Proveedor"}
      </Typography>
      <TextField
        label="Nombre"
        name="name"
        fullWidth
        margin="normal"
        value={supplierData.name}
        onChange={handleInputChange}
        disabled={isViewMode}
      />
      <TextField
        label="Dirección"
        name="address"
        fullWidth
        margin="normal"
        value={supplierData.address}
        onChange={handleInputChange}
        disabled={isViewMode}
      />
      <TextField
        label="Teléfono"
        name="phone"
        fullWidth
        margin="normal"
        value={supplierData.phone}
        onChange={handleInputChange}
        disabled={isViewMode}
      />
      <TextField
        label="Email"
        name="email"
        fullWidth
        margin="normal"
        value={supplierData.email}
        onChange={handleInputChange}
        disabled={isViewMode}
      />
      <TextField
        label="Website"
        name="website"
        fullWidth
        margin="normal"
        value={supplierData.website}
        onChange={handleInputChange}
        disabled={isViewMode}
      />
      {!isViewMode && (
        <Button variant="contained" color="primary" onClick={handleSave}>
          {mode === "create" ? "Guardar" : "Guardar Cambios"}
        </Button>
      )}
    </div>
  );
};

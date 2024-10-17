// SupplierFormPage.tsx
import React from "react";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useSupplierForm } from "./hooks/useSupplierForm";
import { SupplierData, useFormValidation } from "./hooks/useFormValidation";
import { useFetchSupplierFormData } from "./hooks/useFetchSupplierFormData";
import { useNotification } from "../../context/NotificationProvider/NotificationProvider";

interface SupplierFormPageProps {
  mode: "create" | "edit" | "view";
}

export const SupplierFormPage: React.FC<SupplierFormPageProps> = ({ mode }) => {
  const { formErrors, validateForm } = useFormValidation();
  const {
    supplierTypes,
    sectors,
    categories,
    loadingData,
    error: fetchDataError,
  } = useFetchSupplierFormData();

  const {
    supplierData,
    loading,
    error: formError,
    handleInputChange,
    handleSelectChange,
    handleSave,
    isViewMode,
  } = useSupplierForm(mode);

  const { showNotification } = useNotification();

  const handleSubmit = async () => {
    if (validateForm(supplierData as SupplierData)) {
      try {
        await handleSave();
        showNotification("Proveedor creado con éxito.", "success");
      } catch {
        showNotification("Error al crear el proveedor.", "error");
      }
    }
  };

  if (loading || loadingData) return <CircularProgress />;
  if (formError || fetchDataError)
    return <Typography color="error">{formError || fetchDataError}</Typography>;

  return (
    <div className="mt-6 max-w-lg mx-auto flex flex-col space-y-4 p-4 bg-white shadow-md rounded-md">
      <Typography variant="h4" className="text-gray-800 mb-4">
        {mode === "create"
          ? "Crear Proveedor"
          : mode === "edit"
          ? "Editar Proveedor"
          : "Detalles del Proveedor"}
      </Typography>

      <TextField
        label="Nombre"
        name="name"
        margin="normal"
        value={supplierData.name}
        onChange={handleInputChange}
        disabled={isViewMode}
        fullWidth
        error={!!formErrors.name}
        helperText={formErrors.name}
      />

      <FormControl fullWidth margin="normal" error={!!formErrors.category_id}>
        <InputLabel>Categoría</InputLabel>
        <Select
          name="category_id"
          value={supplierData.category_id || ""}
          onChange={handleSelectChange}
          disabled={isViewMode}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        {formErrors.category_id && (
          <Typography color="error">{formErrors.category_id}</Typography>
        )}
      </FormControl>

      <FormControl fullWidth margin="normal" error={!!formErrors.sector_id}>
        <InputLabel>Sector</InputLabel>
        <Select
          name="sector_id"
          value={supplierData.sector_id || ""}
          onChange={handleSelectChange}
          disabled={isViewMode}
        >
          {sectors.map((sector) => (
            <MenuItem key={sector.id} value={sector.id}>
              {sector.name}
            </MenuItem>
          ))}
        </Select>
        {formErrors.sector_id && (
          <Typography color="error">{formErrors.sector_id}</Typography>
        )}
      </FormControl>

      <FormControl
        fullWidth
        margin="normal"
        error={!!formErrors.supplier_type_id}
      >
        <InputLabel>Tipo de Proveedor</InputLabel>
        <Select
          name="supplier_type_id"
          value={supplierData.supplier_type_id || ""}
          onChange={handleSelectChange}
          disabled={isViewMode}
        >
          {supplierTypes.map((type) => (
            <MenuItem key={type.id} value={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
        {formErrors.supplier_type_id && (
          <Typography color="error">{formErrors.supplier_type_id}</Typography>
        )}
      </FormControl>

      <TextField
        label="Dirección"
        name="address"
        margin="normal"
        value={supplierData.address}
        onChange={handleInputChange}
        disabled={isViewMode}
        fullWidth
        error={!!formErrors.address}
        helperText={formErrors.address}
      />
      <TextField
        label="Teléfono"
        name="phone"
        margin="normal"
        value={supplierData.phone}
        onChange={handleInputChange}
        disabled={isViewMode}
        fullWidth
        error={!!formErrors.phone}
        helperText={formErrors.phone}
      />
      <TextField
        label="Email"
        name="email"
        margin="normal"
        value={supplierData.email}
        onChange={handleInputChange}
        disabled={isViewMode}
        fullWidth
        error={!!formErrors.email}
        helperText={formErrors.email}
      />
      <TextField
        label="Website"
        name="website"
        margin="normal"
        value={supplierData.website}
        onChange={handleInputChange}
        disabled={isViewMode}
        fullWidth
        type="url"
        error={!!formErrors.website}
        helperText={formErrors.website}
      />

      {!isViewMode && (
        <div className="flex justify-center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className="w-1/2 bg-blue-500 hover:bg-blue-600"
          >
            {mode === "create" ? "Guardar" : "Guardar Cambios"}
          </Button>
        </div>
      )}
    </div>
  );
};

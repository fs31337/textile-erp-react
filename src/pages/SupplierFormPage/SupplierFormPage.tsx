import React, { useCallback, useEffect, useState } from "react";
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
import {
  getSupplierTypes,
  SupplierType,
} from "../../services/SupplierTypeService";
import { getSectors, Sector } from "../../services/SectorService";
import { Category, getCategories } from "../../services/CategoryService";

interface SupplierFormPageProps {
  mode: "create" | "edit" | "view";
}

export const SupplierFormPage: React.FC<SupplierFormPageProps> = ({ mode }) => {
  const {
    supplierData,
    loading,
    error,
    handleInputChange,
    handleSelectChange,
    handleSave,
    isViewMode,
  } = useSupplierForm(mode);

  const [supplierTypes, setSupplierTypes] = useState<SupplierType[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const [supplierTypesData, sectorsData, categoriesData] =
        await Promise.all([getSupplierTypes(), getSectors(), getCategories()]);
      console.log(supplierTypesData, sectorsData, categoriesData);
      setSupplierTypes(supplierTypesData);
      setSectors(sectorsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

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
      />

      <FormControl fullWidth margin="normal">
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
      </FormControl>

      <FormControl fullWidth margin="normal">
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
      </FormControl>

      <FormControl fullWidth margin="normal">
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
      </FormControl>

      <TextField
        label="Dirección"
        name="address"
        margin="normal"
        value={supplierData.address}
        onChange={handleInputChange}
        disabled={isViewMode}
        fullWidth
      />
      <TextField
        label="Teléfono"
        name="phone"
        margin="normal"
        value={supplierData.phone}
        onChange={handleInputChange}
        disabled={isViewMode}
        fullWidth
      />
      <TextField
        label="Email"
        name="email"
        margin="normal"
        value={supplierData.email}
        onChange={handleInputChange}
        disabled={isViewMode}
        fullWidth
      />
      <TextField
        label="Website"
        name="website"
        margin="normal"
        value={supplierData.website}
        onChange={handleInputChange}
        disabled={isViewMode}
        fullWidth
      />

      {!isViewMode && (
        <div className="flex justify-center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            className="w-1/2 bg-blue-500 hover:bg-blue-600"
          >
            {mode === "create" ? "Guardar" : "Guardar Cambios"}
          </Button>
        </div>
      )}
    </div>
  );
};

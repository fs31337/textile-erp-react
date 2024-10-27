import React, { useEffect, useState } from "react";
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
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "../../context/NotificationProvider/NotificationProvider";
import { useFetchSupplierFormData } from "./hooks/useFetchSupplierFormData";
import {
  createSupplier,
  getSupplierById,
  updateSupplier,
} from "../../services/Suppliers";

interface SupplierData {
  name: string;
  address: string;
  phone: string;
  email: string;
  category_id: number;
  sector_id: number;
  supplier_type_id: number;
  website?: string;
}

interface SupplierFormPageProps {
  mode: "create" | "edit" | "view";
}

// Esquema de validación con Yup
const supplierSchema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio."),
  address: yup.string().required("La dirección es obligatoria."),
  phone: yup.string().required("El teléfono es obligatorio."),
  email: yup
    .string()
    .email("Ingresa un email válido.")
    .required("El email es obligatorio."),
  category_id: yup
    .number()
    .typeError("Selecciona una categoría.")
    .required("Selecciona una categoría."),
  sector_id: yup
    .number()
    .typeError("Selecciona un sector.")
    .required("Selecciona un sector."),
  supplier_type_id: yup
    .number()
    .typeError("Selecciona un tipo de proveedor.")
    .required("Selecciona un tipo de proveedor."),
  website: yup.string().url("Ingresa una URL válida.").optional(),
});

export const SupplierFormPage: React.FC<SupplierFormPageProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const {
    supplierTypes,
    sectors,
    categories,
    loadingData,
    error: fetchDataError,
  } = useFetchSupplierFormData();
  const [isLoading, setIsLoading] = useState<boolean>(
    mode === "edit" || mode === "view"
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<SupplierData>({
    resolver: yupResolver(supplierSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
      category_id: NaN,
      sector_id: NaN,
      supplier_type_id: NaN,
      website: undefined,
    },
  });

  const isViewMode = mode === "view";
  const { id } = useParams<{ id: string }>();

  // Cargar datos en modo de edición o visualización
  useEffect(() => {
    if ((mode === "edit" || mode === "view") && id) {
      setIsLoading(true);
      getSupplierById(Number(id))
        .then((response) => {
          reset({
            ...response.data,
            website: response.data.website || undefined,
          });
          setIsLoading(false);
        })
        .catch(() => {
          showNotification("Error al cargar el proveedor.", "error");
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [id, mode, reset, showNotification]);

  // Maneja el envío del formulario
  const onSubmit = (data: SupplierData) => {
    if (mode === "create") {
      createSupplier(data)
        .then(() => {
          showNotification("Proveedor creado con éxito.", "success");
          navigate("/proveedores");
        })
        .catch(() => {
          showNotification("Error al crear el proveedor.", "error");
        });
    } else if (mode === "edit" && id) {
      if (!isDirty) {
        showNotification("No hay cambios para guardar.", "info");
        return;
      }
      updateSupplier(Number(id), data)
        .then(() => {
          showNotification("Proveedor modificado con éxito.", "success");
          navigate("/proveedores");
        })
        .catch(() => {
          showNotification("Error al modificar el proveedor.", "error");
        });
    }
  };

  if (isLoading || loadingData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (fetchDataError) {
    return <Typography color="error">{fetchDataError}</Typography>;
  }

  return (
    <div className="mt-6 max-w-lg mx-auto flex flex-col space-y-4 p-4 bg-white shadow-md rounded-md">
      <Typography variant="h4" className="text-gray-800 mb-4">
        {mode === "create"
          ? "Crear Proveedor"
          : mode === "edit"
          ? "Editar Proveedor"
          : "Detalles del Proveedor"}
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

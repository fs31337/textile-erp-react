import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createSupplier,
  getSupplierById,
  Supplier,
  updateSupplier,
} from "../../../services/Suppliers";
import { SelectChangeEvent } from "@mui/material";
import { useNotification } from "../../../context/NotificationProvider/NotificationProvider";

interface UseSupplierFormResult {
  supplierData: Omit<Supplier, "id" | "created_at" | "updated_at">;
  loading: boolean;
  error: string | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (e: SelectChangeEvent<number>) => void;
  handleSave: () => void;
  isViewMode: boolean;
}

export const useSupplierForm = (
  mode: "create" | "edit" | "view"
): UseSupplierFormResult => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [supplierData, setSupplierData] = useState<
    Omit<Supplier, "id" | "created_at" | "updated_at">
  >({
    name: "",
    address: "",
    phone: "",
    email: "",
    category_id: NaN,
    sector_id: NaN,
    supplier_type_id: NaN,
    website: "",
  });
  const [loading, setLoading] = useState<boolean>(
    mode === "edit" || mode === "view"
  );
  const [error, setError] = useState<string | null>(null);
  const { showNotification } = useNotification();
  useEffect(() => {
    if ((mode === "edit" || mode === "view") && id) {
      setLoading(true);
      getSupplierById(Number(id))
        .then((response) => {
          setSupplierData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Error al cargar el proveedor");
          setLoading(false);
        });
    }
  }, [id, mode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSupplierData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    const { name, value } = e.target;
    setSupplierData((prevData) => ({
      ...prevData,
      [name]: Number(value),
    }));
  };

  const handleSave = () => {
    if (mode === "create") {
      createSupplier(supplierData)
        .then(() => {
          showNotification("Proveedor creado con éxito.", "success");
          navigate("/proveedores");
        })
        .catch(() => {
          setError("Error al crear el proveedor");
          showNotification("Error al crear el proveedor.", "error");
        });
    } else if (mode === "edit" && id) {
      updateSupplier(Number(id), supplierData)
        .then(() => {
          showNotification("Proveedor modificado con éxito.", "success");
          navigate("/proveedores");
        })
        .catch(() => {
          setError("Error al actualizar el proveedor");
          showNotification("Error al modificar el proveedor.", "error");
        });
    }
  };

  return {
    supplierData,
    loading,
    error,
    handleInputChange,
    handleSelectChange,
    handleSave,
    isViewMode: mode === "view",
  };
};

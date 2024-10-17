import { useState } from "react";

export interface SupplierData {
  name: string;
  address: string;
  phone: string;
  email: string;
  category_id: number;
  sector_id: number;
  supplier_type_id: number;
  website?: string;
}

interface FormErrors {
  [key: string]: string;
}

export const useFormValidation = () => {
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validateForm = (supplierData: SupplierData): boolean => {
    const errors: FormErrors = {};

    if (!supplierData.name) errors.name = "El nombre es obligatorio.";
    if (!supplierData.category_id)
      errors.category_id = "Selecciona una categoría.";
    if (!supplierData.sector_id) errors.sector_id = "Selecciona un sector.";
    if (!supplierData.supplier_type_id)
      errors.supplier_type_id = "Selecciona un tipo de proveedor.";
    if (!supplierData.address) errors.address = "La dirección es obligatoria.";
    if (!supplierData.phone) errors.phone = "El teléfono es obligatorio.";

    if (!supplierData.email) {
      errors.email = "El email es obligatorio.";
    } else {
      const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailPattern.test(supplierData.email)) {
        errors.email = "Ingresa un email válido.";
      }
    }

    if (supplierData.website) {
      const urlPattern =
        /^(https?:\/\/)([\w\d-]+\.)+[\w]{2,}(\/[\w\d-._~:/?#[\]@!$&'()*+,;=]*)?$/;
      if (!urlPattern.test(supplierData.website)) {
        errors.website = "Ingresa una URL válida.";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return { formErrors, validateForm };
};

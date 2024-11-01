import * as yup from "yup";

export const supplierSchema = yup.object().shape({
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

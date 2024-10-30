import * as yup from "yup";

export const contactSchema = yup.object().shape({
  supplier_id: yup
    .number()
    .typeError("Selecciona un proveedor")
    .required("Selecciona un proveedor"),
  name: yup.string().required("El nombre es obligatorio."),
  phone: yup.string(),
  email: yup.string().email("Ingresa un email válido.").optional(),
  position: yup.string().optional(),
});

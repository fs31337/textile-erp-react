import * as yup from "yup";

export const customerSchema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio."),
  phone: yup.string().optional(),
  email: yup.string().email("Ingresa un email válido.").optional(),
});

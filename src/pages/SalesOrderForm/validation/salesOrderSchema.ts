import * as yup from "yup";

export const salesOrderSchema = yup.object().shape({
  customer_id: yup
    .number()
    .required("El ID del cliente es obligatorio.")
    .positive("El ID del cliente debe ser un número positivo."),
  total: yup
    .number()
    .required("El total es obligatorio.")
    .positive("El total debe ser un número positivo."),
  status: yup.string().required("El estado es obligatorio."),
  date: yup
    .string()
    .required("La fecha es obligatoria.")
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "La fecha debe estar en formato YYYY-MM-DD."
    ),
});

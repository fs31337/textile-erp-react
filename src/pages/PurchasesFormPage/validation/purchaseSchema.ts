import * as yup from "yup";

export const purchaseSchema = yup.object().shape({
  supplier_id: yup
    .number()
    .required("El proveedor es obligatorio.")
    .typeError("Selecciona un proveedor válido."),
  date: yup
    .string()
    .required("La fecha es obligatoria.")
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "La fecha debe estar en formato YYYY-MM-DD."
    ),
  total: yup
    .string()
    .required("El total es obligatorio.")
    .matches(/^\d+(\.\d{1,2})?$/, "El total debe ser un número válido.")
    .test(
      "is-positive",
      "El total no puede ser negativo.",
      (value) => parseFloat(value || "") >= 0
    ),
});

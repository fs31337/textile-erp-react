import * as yup from "yup";

export const finishedProductSchema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio."),
  description: yup.string().optional(),
  price: yup
    .number()
    .typeError("El precio debe ser un número.")
    .positive("El precio debe ser positivo.")
    .required("El precio es obligatorio."),
  current_stock: yup
    .number()
    .typeError("El stock actual debe ser un número.")
    .min(0, "El stock actual no puede ser negativo.")
    .required("El stock actual es obligatorio."),
});

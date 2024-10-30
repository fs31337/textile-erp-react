import * as yup from "yup";

export const materialSchema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre del material es obligatorio.")
    .min(3, "El nombre debe tener al menos 3 caracteres.")
    .max(50, "El nombre no puede exceder los 50 caracteres."),
  description: yup
    .string()
    .max(200, "La descripción no puede exceder los 200 caracteres."),
  cost: yup
    .number()
    .required("El costo es obligatorio.")
    .typeError("El costo debe ser un número.")
    .min(0, "El costo no puede ser negativo."),
  current_stock: yup
    .number()
    .required("El stock actual es obligatorio.")
    .typeError("El stock actual debe ser un número.")
    .min(0, "El stock actual no puede ser negativo."),
  unit_of_measure: yup
    .string()
    .required("La unidad de medida es obligatoria.")
    .max(10, "La unidad de medida no puede exceder los 10 caracteres."),
});

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "../../../context/NotificationProvider/NotificationProvider";
import {
  createCustomer,
  Customer,
  getCustomerById,
  updateCustomer,
} from "../../../services/CustomerService";
import { customerSchema } from "../validation/customerSchema";
import { CustomerData } from "../types";

export const useCustomerForm = (mode: "create" | "edit" | "view") => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(mode !== "create");
  const isViewMode = mode === "view";

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<CustomerData>({
    resolver: yupResolver(customerSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && id) {
      setIsLoading(true);
      getCustomerById(Number(id))
        .then((response) => {
          reset(response.data);
          setIsLoading(false);
        })
        .catch(() => {
          showNotification("Error al cargar el cliente.", "error");
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [id, mode, reset, showNotification]);

  const onSubmit = (data: Omit<Customer, "id">) => {
    if (mode === "create") {
      createCustomer(data)
        .then(() => {
          showNotification("Cliente creado con éxito.", "success");
          navigate("/clientes");
        })
        .catch(() => {
          showNotification("Error al crear el cliente.", "error");
        });
    } else if (mode === "edit" && id) {
      if (!isDirty) {
        showNotification("No hay cambios para guardar.", "info");
        return;
      }
      updateCustomer(Number(id), data)
        .then(() => {
          showNotification("Cliente modificado con éxito.", "success");
          navigate("/clientes");
        })
        .catch(() => {
          showNotification("Error al modificar el cliente.", "error");
        });
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    isLoading,
    isViewMode,
    onSubmit,
  };
};

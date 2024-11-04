import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";

import { contactSchema } from "../validation/contactSchema";
import {
  createContactPerson,
  getContactPersonById,
  updateContactPerson,
} from "../../../services/ContactPerson";
import { useNotification } from "../../../context/NotificationProvider/NotificationProvider";
import { ContactPersonData } from "../types";
import { getSuppliers, Supplier } from "../../../services/Suppliers";

export const useContactsForm = (mode: "create" | "edit" | "view") => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(mode !== "create");
  const { id } = useParams<{ id: string }>();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ContactPersonData>({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      supplier_id: 0,
      name: "",
      phone: "",
      email: "",
      position: "",
    },
  });

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && id) {
      setIsLoading(true);
      getContactPersonById(Number(id))
        .then((response) => {
          reset(response.data);
          setIsLoading(false);
        })
        .catch(() => {
          showNotification("Error al cargar el contacto.", "error");
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [id, mode, reset, showNotification]);

  useEffect(() => {
    setIsLoading(true);
    getSuppliers()
      .then((response) => {
        setSuppliers(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        showNotification("Error al cargar los proveedores.", "error");
        setIsLoading(false);
      });
  }, [id, mode, reset, showNotification]);

  const onSubmit = (data: ContactPersonData) => {
    if (mode === "create") {
      createContactPerson(data)
        .then(() => {
          showNotification("Contacto creado con éxito.", "success");
          navigate("/contactos");
        })
        .catch(() => {
          showNotification("Error al crear el contacto.", "error");
        });
    } else if (mode === "edit" && id) {
      if (!isDirty) {
        showNotification("No hay cambios para guardar.", "info");
        return;
      }
      updateContactPerson(Number(id), data)
        .then(() => {
          showNotification("Contacto modificado con éxito.", "success");
          navigate("/contactos");
        })
        .catch(() => {
          showNotification("Error al modificar el contacto.", "error");
        });
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    isLoading,
    isViewMode: mode === "view",
    onSubmit,
    suppliers,
    isDirty,
  };
};

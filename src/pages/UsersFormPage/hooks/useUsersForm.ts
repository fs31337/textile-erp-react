import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "../../../context/NotificationProvider/NotificationProvider";
import {
  createUser,
  getUserById,
  updateUser,
} from "../../../services/UserService";
import { userSchema } from "../validation/userSchema";
import { UserData } from "../types";

export const useUserForm = (mode: "create" | "edit" | "view") => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(
    mode === "edit" || mode === "view"
  );
  const { id } = useParams<{ id: string }>();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<UserData>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && id) {
      setIsLoading(true);
      getUserById(Number(id))
        .then((response) => {
          reset({ ...response.data, password: "" });
          setIsLoading(false);
        })
        .catch(() => {
          showNotification("Error al cargar el usuario.", "error");
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [id, mode, reset, showNotification]);

  const onSubmit = (data: UserData) => {
    if (mode === "create") {
      createUser(data)
        .then(() => {
          showNotification("Usuario creado con éxito.", "success");
          navigate("/usuarios");
        })
        .catch(() => {
          showNotification("Error al crear el usuario.", "error");
        });
    } else if (mode === "edit" && id) {
      if (!isDirty) {
        showNotification("No hay cambios para guardar.", "info");
        return;
      }
      updateUser(Number(id), data)
        .then(() => {
          showNotification("Usuario modificado con éxito.", "success");
          navigate("/usuarios");
        })
        .catch(() => {
          showNotification("Error al modificar el usuario.", "error");
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
  };
};

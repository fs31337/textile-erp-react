import { useState, useEffect } from "react";
import { useNotification } from "../../../context/NotificationProvider/NotificationProvider";
import { deleteUser, getUsers, User } from "../../../services/UserService";

interface UseUsersResult {
  users: User[];
  loading: boolean;
  error: Error | null;
  removeUser: (id: number) => Promise<void>;
}

export const useUsers = (): UseUsersResult => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const removeUser = async (id: number) => {
    try {
      await deleteUser(id);
      showNotification("Usuario eliminado con éxito.", "success");
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      showNotification("Error al eliminar el usuario.", "error");
      setError(err as Error);
    }
  };

  return {
    users,
    loading,
    error,
    removeUser,
  };
};

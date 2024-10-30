import { useState, useEffect } from "react";
import {
  deleteContactPerson,
  getContactPersons,
  ContactPerson,
} from "../../../services/ContactPerson";
import { useNotification } from "../../../context/NotificationProvider/NotificationProvider";

interface UseContactPersonResult {
  contactPerson: ContactPerson[];
  loading: boolean;
  error: Error | null;
  removeContactPerson: (id: number) => Promise<void>;
}

export const useContactPerson = (): UseContactPersonResult => {
  const [contactPerson, setContactPerson] = useState<ContactPerson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { showNotification } = useNotification();
  useEffect(() => {
    setLoading(true);
    getContactPersons()
      .then((response) => {
        setContactPerson(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const removeContactPerson = async (id: number) => {
    try {
      await deleteContactPerson(id);
      showNotification("Persona de contacto eliminado con éxito.", "success");
      setContactPerson((prev) => prev.filter((contact) => contact.id !== id));
    } catch (err) {
      showNotification("Error al eliminar Persona de contacto.", "error");
      setError(err as Error);
    }
  };
  return {
    contactPerson,
    loading,
    error,
    removeContactPerson,
  };
};

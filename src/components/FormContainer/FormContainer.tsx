import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ConfirmationDialog } from "../DataTable/components/ConfirmationDialog";

interface FormContainerProps {
  title: string;
  isViewMode?: boolean;
  onSave?: () => void;
  children: React.ReactNode;
  isDirty: boolean;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  title,
  isViewMode = false,
  onSave,
  children,
  isDirty,
}) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const handleGoBack = () => {
    if (isDirty) {
      setOpenDialog(true);
    } else {
      navigate(-1);
    }
  };
  const confirmGoBack = () => {
    setOpenDialog(false);
    navigate(-1);
  };

  return (
    <>
      <div className="mt-6 max-w-lg mx-auto flex flex-col space-y-4 p-4 bg-white shadow-md rounded-md">
        <Typography variant="h4" className="text-gray-800 mb-4">
          {title}
        </Typography>

        <div>{children}</div>

        <div className="flex justify-between mt-4">
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleGoBack}
            className="w-1/3"
          >
            Volver
          </Button>

          {!isViewMode && onSave && (
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={onSave}
              className="w-1/2 bg-blue-500 hover:bg-blue-600"
            >
              Guardar
            </Button>
          )}
        </div>
      </div>
      <ConfirmationDialog
        open={openDialog}
        title="Tienes cambios sin guardar"
        description="¿Estás seguro de volver a la pagina anterior?"
        onConfirm={confirmGoBack}
        onCancel={() => setOpenDialog(false)}
        confirmText="Continuar"
      />
    </>
  );
};

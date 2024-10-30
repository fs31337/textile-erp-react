import React, { useRef, useEffect, useState } from "react";
import { TextField, Typography, Box, Button } from "@mui/material";

export const QRCodeReader: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [qrCode, setQrCode] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(true);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQrCode(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const clearQrCode = () => {
    setQrCode("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Typography variant="h4" gutterBottom>
        Lector de Código QR
      </Typography>

      <TextField
        inputRef={inputRef}
        value={qrCode}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        style={{ opacity: 0, position: "absolute" }}
        inputProps={{ "aria-hidden": true }}
      />

      <Typography variant="h6" color="textSecondary" gutterBottom>
        {qrCode ? `QR Escaneado: ${qrCode}` : "Escanea un código QR..."}
      </Typography>

      {qrCode && (
        <Button variant="contained" color="primary" onClick={clearQrCode}>
          Limpiar
        </Button>
      )}

      {!isFocused && (
        <Button variant="outlined" color="secondary" onClick={handleFocus}>
          Volver a enfocar
        </Button>
      )}
    </Box>
  );
};

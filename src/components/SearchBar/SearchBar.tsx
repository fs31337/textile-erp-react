import React from "react";
import TextField from "@mui/material/TextField";

interface SearchBarProps {
  searchText: string;
  onSearchChange: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchText,
  onSearchChange,
}) => {
  return (
    <TextField
      label="Buscar"
      variant="outlined"
      fullWidth
      margin="normal"
      value={searchText}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};

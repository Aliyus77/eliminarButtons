import React from "react";
import { TextField, Button, Box, CircularProgress } from "@mui/material";

const CustomInput = ({ value, onChange, onClick, isLoading }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "36.5px",
        gap: "20px",
      }}
    >
      <TextField
        placeholder="código de seguridad"
        value={value}
        size="small"
        onChange={onChange}
      />
      <Button onClick={onClick} variant="contained">
        {isLoading && (
          <CircularProgress sx={{ color: "red", mr: "5px" }} size="1em" />
        )}
        Comprobar
      </Button>
    </Box>
  );
};

export default CustomInput;

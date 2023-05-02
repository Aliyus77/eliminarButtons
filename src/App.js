import React from "react";
import { UseState } from "./UseState.js";
import { UseReducer } from "./UseReducer.js";
import { Box } from "@mui/material";
import "./App.css";
const css = {
  app: {
    textAlign: "center",
    height: "100vh",
    color: "#2c2c2c",
    backgroundColor: "#252525",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#dedede",
    padding: "30px",
    borderRadius: "16px",
  },
};
function App() {
  return (
    <Box sx={css.app}>
      <Box sx={css.container}>
        <UseState name="UseState" />
        <UseReducer name="UseReducer" />
      </Box>
    </Box>
  );
}

export default App;

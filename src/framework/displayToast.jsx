import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CustomSnackbar from "./CustomSnackbar";

const theme = createTheme();
let toastRoot = null;

export const displayToast = ({
  message,
  severity = "success",
  autoHideDuration = 3000,
}) => {
  const container = document.getElementById("toast-overlay");

  if (!container) {
    console.error("toast-overlay element not found");
    return;
  }

  if (!toastRoot) {
    toastRoot = createRoot(container);
  }

  const ToastWrapper = () => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <ThemeProvider theme={theme}>
        <CustomSnackbar
          open={open}
          onClose={handleClose}
          message={message}
          severity={severity}
          autoHideDuration={autoHideDuration}
        />
      </ThemeProvider>
    );
  };

  toastRoot.render(<ToastWrapper />);
};

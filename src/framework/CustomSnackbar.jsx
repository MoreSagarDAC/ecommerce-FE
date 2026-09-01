import React from "react";
import { Snackbar, Alert } from "@mui/material";

// severity="success" // green
// severity="error"   // red
// severity="warning" // orange
// severity="info"    // blue
function CustomSnackbar({
  open,
  onClose,
  message,
  severity = "success",
  vertical = "top",
  horizontal = "right",
  autoHideDuration = 3000,
}) {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
export default CustomSnackbar;

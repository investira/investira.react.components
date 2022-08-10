import React from "react";
import { default as MuiSnackbar } from "@mui/material/Snackbar";

function Snackbar(props) {
  const { children, onClose, ...xPassThruAttrs } = props;

  return (
    <MuiSnackbar {...xPassThruAttrs} onClose={onClose}>
      {children}
    </MuiSnackbar>
  );
}

export default Snackbar;

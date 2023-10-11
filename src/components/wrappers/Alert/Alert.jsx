import React from "react";
import { default as MuiAlert } from "@mui/lab/Alert";
import { styled } from "@mui/material/styles";

// infoHighlight, secondary, secondaryLight, secondaryLightness

const StyledAlert = styled(MuiAlert)(({ severity, theme }) => ({
  ...(severity === "secondary" && {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.secondary.dark
        : theme.palette.seconday.main,
    color: theme.palette.getContrastText(
      theme.palette.mode === "dark"
        ? theme.palette.secondary.dark
        : theme.palette.seconday.main
    ),
  }),
}));

function Alert(props) {
  return <StyledAlert {...props} />;
}

export default Alert;

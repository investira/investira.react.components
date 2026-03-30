import React from "react";
import styled from "@emotion/styled";
import { default as WSnackbarContent } from "@mui/material/SnackbarContent";
import { amber, green } from "@mui/material/colors";

const StyledSnackbarContent = styled(WSnackbarContent, {
  shouldForwardProp: (prop) => prop !== "variant",
})(({ theme, variant }) => {
  const styles = {};

  if (variant === "success") {
    styles.backgroundColor = green[600];
  }
  if (variant === "error") {
    styles.backgroundColor = theme.palette.error.dark;
  }
  if (variant === "info") {
    styles.backgroundColor = theme.palette.primary.dark;
  }
  if (variant === "warning") {
    styles.backgroundColor = amber[700];
  }

  return styles;
});

const Message = styled("span")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  "& svg": {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
}));

function SnackbarContent(props) {
  const { message, variant, icon: Icon, ...other } = props;

  return (
    <StyledSnackbarContent
      variant={variant}
      message={
        <Message id="client-snackbar">
          {Icon && <Icon />}
          {message}
        </Message>
      }
      {...other}
    />
  );
}

export default SnackbarContent;

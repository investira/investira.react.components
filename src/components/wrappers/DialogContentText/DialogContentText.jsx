import React from "react";
import styled from "@emotion/styled";
import { default as WDialogContentText } from "@mui/material/DialogContentText";

const StyledDialogContentText = styled(WDialogContentText, {
  shouldForwardProp: (prop) => prop !== "nogutter",
})(({ nogutter }) => ({
  ...(nogutter && {
    marginBottom: 0,
  }),
}));

function DialogContentText({ nogutter, ...otherProps }) {
  return <StyledDialogContentText nogutter={nogutter} {...otherProps} />;
}

export default DialogContentText;

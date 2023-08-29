import React, { forwardRef } from "react";
import { default as MuiIconButton } from "@mui/material/IconButton";

const IconButton = forwardRef((props, ref) => {
  return <MuiIconButton {...props} ref={ref} />;
});

export default IconButton;

import React, { forwardRef } from "react";
import { default as MuiBox } from "@mui/material/Box";

const Box = forwardRef((props, ref) => {
  return <MuiBox {...props} ref={ref} />;
});

export default Box;

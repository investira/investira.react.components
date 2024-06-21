import React, { forwardRef } from "react";
import { default as MuiTextField } from "@mui/material/TextField";

const TextField = forwardRef((props, ref) => {
  return <MuiTextField ref={ref} {...props} />;
});

export default TextField;

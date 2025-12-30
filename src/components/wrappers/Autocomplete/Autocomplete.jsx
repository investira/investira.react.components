import React, { forwardRef } from "react";
import { default as MuiAutocomplete } from "@mui/material/Autocomplete";

const Autocomplete = forwardRef((props, ref) => {
  return <MuiAutocomplete ref={ref} {...props} />;
});

export default Autocomplete;

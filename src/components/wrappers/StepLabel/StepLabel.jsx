import React, { forwardRef } from "react";
import { default as MuiStepLabel } from "@mui/material/StepLabel";

const StepLabel = forwardRef((props, ref) => {
  const { children, ...restProps } = props;

  return (
    <MuiStepLabel {...restProps} ref={ref}>
      {children}
    </MuiStepLabel>
  );
});

export default StepLabel;

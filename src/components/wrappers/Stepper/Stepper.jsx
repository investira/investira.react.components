import React, { forwardRef } from "react";
import { default as MuiStepper } from "@mui/material/Stepper";

const Stepper = forwardRef((props, ref) => {
  const { children, ...restProps } = props;

  return (
    <MuiStepper {...restProps} ref={ref}>
      {children}
    </MuiStepper>
  );
});

export default Stepper;

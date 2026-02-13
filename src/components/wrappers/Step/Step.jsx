import React, { forwardRef } from "react";
import { default as MuiStep } from "@mui/material/Step";

const Step = forwardRef((props, ref) => {
  const { children, ...restProps } = props;

  return (
    <MuiStep {...restProps} ref={ref}>
      {children}
    </MuiStep>
  );
});

export default Step;

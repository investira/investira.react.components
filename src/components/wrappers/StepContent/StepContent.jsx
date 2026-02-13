import React, { forwardRef } from "react";
import { default as MuiStepContent } from "@mui/material/StepContent";

const StepContent = forwardRef((props, ref) => {
  const { children, ...restProps } = props;

  return (
    <MuiStepContent {...restProps} ref={ref}>
      {children}
    </MuiStepContent>
  );
});

export default StepContent;

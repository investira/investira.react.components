import React, { forwardRef } from "react";
import { default as MuiStack } from "@mui/material/Stack";

const Stack = forwardRef((props, ref) => {
  const { children, ...restProps } = props;

  return (
    <MuiStack {...restProps} ref={ref}>
      {children}
    </MuiStack>
  );
});

export default Stack;

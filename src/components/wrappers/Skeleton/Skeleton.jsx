import React, { forwardRef } from "react";
import { default as MuiSkeleton } from "@mui/material/Skeleton";

const Skeleton = forwardRef((props, ref) => {
  const { children, ...restProps } = props;

  return (
    <MuiSkeleton {...restProps} ref={ref}>
      {children}
    </MuiSkeleton>
  );
});

export default Skeleton;

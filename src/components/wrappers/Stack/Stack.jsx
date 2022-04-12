import React from "react";
import { default as MuiStack } from "@mui/material/Stack";

function Stack(props) {
  const { children, ...restProps } = props;

  return <MuiStack {...restProps}>{children}</MuiStack>;
}

export default Stack;

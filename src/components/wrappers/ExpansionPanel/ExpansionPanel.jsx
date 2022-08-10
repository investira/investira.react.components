import React from "react";
import { default as MuiExpansionPanel } from "@mui/material/Accordion";

function ExpansionPanel(props) {
  const { children, ...otherProps } = props;
  return <MuiExpansionPanel {...otherProps}>{children}</MuiExpansionPanel>;
}

export default ExpansionPanel;

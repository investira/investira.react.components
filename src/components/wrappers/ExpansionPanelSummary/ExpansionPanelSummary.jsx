import React from "react";
import { default as MuiExpansionPanelSummary } from "@mui/material/AccordionSummary";

function ExpansionPanelSummary(props) {
  const { children, ...otherProps } = props;
  return (
    <MuiExpansionPanelSummary {...otherProps}>
      {children}
    </MuiExpansionPanelSummary>
  );
}

export default ExpansionPanelSummary;

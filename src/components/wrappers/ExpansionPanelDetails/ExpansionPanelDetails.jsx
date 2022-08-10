import React from "react";
import { default as MuiExpansionPanelDetails } from "@mui/material/AccordionDetails";

function ExpansionPanelDetails(props) {
  const { children, ...otherProps } = props;
  return (
    <MuiExpansionPanelDetails {...otherProps}>
      {children}
    </MuiExpansionPanelDetails>
  );
}

export default ExpansionPanelDetails;

import React from "react";
import styled from "@emotion/styled";
import { default as WTab } from "@mui/material/Tab";

const StyledTab = styled(WTab, {
  shouldForwardProp: (prop) => prop !== "direction",
})(({ direction }) => ({
  ...(direction === "row" && {
    "& .MuiTab-wrapper": {
      display: "flex",
      flexDirection: "row",
    },
  }),
  flexBasis: "auto",
  color: "#fff",
}));

function Tab({ direction, ...otherProps }) {
  return <StyledTab direction={direction} {...otherProps} />;
}

export default Tab;

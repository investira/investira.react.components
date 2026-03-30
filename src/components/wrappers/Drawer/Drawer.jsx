import React from "react";
import styled from "@emotion/styled";
import { default as MuiDrawer } from "@mui/material/Drawer";

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "fullHeight",
})(({ fullHeight }) => ({
  ...(fullHeight && {
    "& .MuiPaper-root": {
      height: "100vh",
    },
  }),
}));

function Drawer({ fullHeight, children, ...otherProps }) {
  return (
    <StyledDrawer fullHeight={fullHeight} {...otherProps}>
      {children}
    </StyledDrawer>
  );
}

export default Drawer;

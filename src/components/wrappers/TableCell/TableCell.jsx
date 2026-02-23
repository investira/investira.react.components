import React from "react";
import styled from "@emotion/styled";
import { default as WTableCell } from "@mui/material/TableCell";

const StyledTableCell = styled(WTableCell, {
  shouldForwardProp: (prop) => prop !== "naked",
})(({ naked }) => ({
  ...(naked && {
    borderBottom: "none",
    padding: "8px",
  }),
}));

const TableCell = ({ naked, ...otherProps }) => {
  return <StyledTableCell naked={naked} {...otherProps} />;
};

export default TableCell;

import React, { memo } from "react";
import PropTypes from "prop-types";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const Fluid = styled("div")(() => {
  return {
    flex: "1 1 100%",
    minWidth: 0,
    whiteSpace: "nowrap",
  };
});

const TextOverflow = memo((props) => {
  return (
    <Fluid>
      <Typography
        {...props}
        component="p"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          ...props.sx,
        }}
      >
        {props.children}
      </Typography>
    </Fluid>
  );
});

TextOverflow.propTypes = {};

TextOverflow.displayName = "TextOverflow";

export default TextOverflow;

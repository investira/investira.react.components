import React from "react";
import styled from "@emotion/styled";
import { red, yellow, blue } from "@mui/material/colors";
import { default as WChip } from "@mui/material/Chip";

const StyledChip = styled(WChip, {
  shouldForwardProp: (prop) => prop !== "sizeCustom" && prop !== "colorCustom",
})(({ theme, sizeCustom, colorCustom, variant }) => {
  const styles = {};

  if (sizeCustom === "tiny") {
    styles.height = 14;
    styles.fontSize = theme.typography.pxToRem(11);
  }

  if (colorCustom === "error") {
    if (variant === "outlined") {
      styles.color = red[500];
      styles.border = "1px solid #b30000";
    } else {
      styles.color = theme.palette.getContrastText(red[500]);
      styles.border = "1px solid #f44336";
      styles.backgroundColor = red[500];
    }
  }

  if (colorCustom === "info") {
    if (variant === "outlined") {
      styles.color = blue[500];
      styles.border = "1px solid #2196f3";
    } else {
      styles.color = theme.palette.getContrastText(blue[500]);
      styles.border = "1px solid #2196f3";
      styles.backgroundColor = blue[500];
    }
  }

  if (colorCustom === "warn") {
    if (variant === "outlined") {
      styles.color = "#f1b40f";
      styles.border = "1px solid #f1b40f";
    } else {
      styles.color = theme.palette.getContrastText(yellow[500]);
      styles.border = "1px solid #f1b40f";
      styles.backgroundColor = "#f1b40f";
    }
  }

  return styles;
});

function Chip({ size, color, variant, ...otherProps }) {
  return (
    <StyledChip
      sizeCustom={size}
      colorCustom={color}
      variant={variant}
      {...otherProps}
    />
  );
}

export default Chip;

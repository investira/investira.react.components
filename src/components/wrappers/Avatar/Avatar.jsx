import React from "react";
import styled from "@emotion/styled";
import { default as WAvatar } from "@mui/material/Avatar";
import {
  red,
  purple,
  yellow,
  lightGreen,
  lightBlue,
  amber,
  pink,
} from "@mui/material/colors";

const StyledAvatar = styled(WAvatar, {
  shouldForwardProp: (prop) =>
    !["sizeCustom", "colorCustom"].includes(prop.toString()),
})(({ theme, sizeCustom, colorCustom }) => {
  const styles = {
    display: "flex",
    fontSize: 15,
    "& > *": {
      margin: theme.spacing(1),
    },
  };

  if (sizeCustom === "small") {
    styles.width = theme.spacing(3);
    styles.height = theme.spacing(3);
    styles.fontSize = 10;
  }

  if (sizeCustom === "large") {
    styles.width = theme.spacing(7);
    styles.height = theme.spacing(7);
    styles.fontSize = 20;
  }

  if (sizeCustom === "xlarge") {
    styles.width = theme.spacing(15);
    styles.height = theme.spacing(15);
    styles.fontSize = 48;
  }

  if (sizeCustom === "full") {
    styles.width = "100%";
    styles.height = "100%";
    styles.fontSize = 96;
  }

  const colorMap = {
    red: red[500],
    blue: lightBlue[500],
    yellow: yellow[500],
    orange: amber[500],
    green: lightGreen[500],
    purple: purple[500],
    pink: pink[500],
  };

  if (colorCustom && colorMap[colorCustom]) {
    const baseColor = colorMap[colorCustom];
    styles.color = theme.palette.getContrastText(baseColor);
    styles.backgroundColor = baseColor;
  }

  return styles;
});

function Avatar({ size, color, ...otherProps }) {
  return (
    <StyledAvatar sizeCustom={size} colorCustom={color} {...otherProps} />
  );
}

export default Avatar;

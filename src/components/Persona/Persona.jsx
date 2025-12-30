import React, { memo } from "react";
import { displays } from "investira.react.lib";
import { Avatar } from "@mui/material";

const Persona = (props) => {
  const { alt, sx, sizeLetters = 2, ...restProps } = props;

  function stringAvatar(pName = "") {
    if (!pName) {
      return {};
    }

    return {
      sx: {
        ...sx,
        bgcolor: displays.stringToColor(pName),
      },
      children: displays.initialsLetters(pName, sizeLetters),
    };
  }

  return <Avatar alt={alt} {...restProps} {...stringAvatar(alt)} />;
};

export default Persona;

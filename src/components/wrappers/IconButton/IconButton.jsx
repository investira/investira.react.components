import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { default as WIconButton } from "@mui/material/IconButton";
import { classList } from "../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  noPadding: {
    padding: "0px",
  },
}));

function IconButton(props) {
  const classes = useStyles();
  const xClassNames = {
    [classes.noPadding]: props.nopadding,
  };

  return <WIconButton className={classList(xClassNames)} {...props} />;
}

export default IconButton;

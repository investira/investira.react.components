import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { classList } from "../../utils/helpers";
import { default as WDialogContentText } from "@mui/material/DialogContentText";

const useStyles = makeStyles((theme) => ({
  root: {
    "margin-bottom": "0",
  },
}));

function DialogContentText(props) {
  const classes = useStyles();
  const xClassNames = {
    [classes.root]: props.nogutter,
  };
  return <WDialogContentText {...props} className={classList(xClassNames)} />;
}

export default DialogContentText;

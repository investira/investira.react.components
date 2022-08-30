import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { red, yellow, blue } from "@mui/material/colors";
import { classList } from "../../utils/helpers";
import { default as WChip } from "@mui/material/Chip";

const useStyles = makeStyles((theme) => ({
  tiny: {
    height: 14,
    fontSize: theme.typography.pxToRem(11),
  },
  error: {
    color: theme.palette.getContrastText(red[500]),
    border: "1px solid #f44336",
    backgroundColor: red[500],
  },
  dangerOutlined: {
    color: red[500],
    border: "1px solid #b30000",
  },
  info: {
    color: theme.palette.getContrastText(blue[500]),
    border: "1px solid #2196f3",
    backgroundColor: blue[500],
  },
  infoOutlined: {
    color: blue[500],
    border: "1px solid #2196f3",
  },
  warn: {
    color: theme.palette.getContrastText(yellow[500]),
    border: "1px solid #f1b40f",
    backgroundColor: "#f1b40f",
  },
  warnOutlined: {
    color: "#f1b40f",
    border: "1px solid #f1b40f",
  },
}));

function Chip(props) {
  const classes = useStyles();
  const xClassNames = {
    [classes.tiny]: props.size === "tiny",
    [classes.error]: props.color === "error" && props.variant !== "outlined",
    [classes.dangerOutlined]:
      props.color === "error" && props.variant === "outlined",
    [classes.infoOutlined]:
      props.color === "info" && props.variant === "outlined",
    [classes.info]: props.color === "info" && props.variant !== "outlined",
    [classes.warn]: props.color === "warn" && props.variant !== "outlined",
    [classes.warnOutlined]:
      props.color === "warn" && props.variant === "outlined",
  };
  return <WChip {...props} className={classList(xClassNames)} />;
}

export default Chip;

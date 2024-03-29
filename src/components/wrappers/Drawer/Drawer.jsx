import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { default as MuiDrawer } from "@mui/material/Drawer";
import { classList } from "../../utils/helpers";

const useStyles = makeStyles(
  (theme) => ({
    fullHeight: {
      "& $paper": {
        height: "100vh",
      },
    },
    paper: {},
  }),
  { name: "MuiDrawer" }
);

function Drawer(props) {
  const { fullHeight, ...otherProps } = props;
  const classes = useStyles();
  const xClassNames = {
    [classes.fullHeight]: fullHeight,
  };

  return (
    <MuiDrawer {...otherProps} className={classList(xClassNames)}>
      {props.children}
    </MuiDrawer>
  );
}

export default Drawer;

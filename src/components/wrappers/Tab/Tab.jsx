import React from "react";
import { default as WTab } from "@mui/material/Tab";
import makeStyles from "@mui/styles/makeStyles";
import { classList } from "../../utils/helpers";

const useStyles = makeStyles(
  (theme) => ({
    horizontalRoot: {
      "& $wrapper": {
        display: "flex",
        flexDirection: "row",
      },
    },
    fullWidth: {
      flexBasis: "auto",
    },
    textColorPrimary: {
      color: "#fff",
    },
    wrapper: {},
  }),
  { name: "MuiTab" }
);

function Tab(props) {
  const classes = useStyles();
  const xClassNames = {
    [classes.horizontalRoot]: props.direction === "row",
    [classes.fullWidth]: true,
    [classes.textColorPrimary]: true,
  };

  return <WTab {...props} className={classList(xClassNames)} />;
}

export default Tab;

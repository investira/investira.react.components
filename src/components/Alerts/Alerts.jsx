import React, { memo, useState, useEffect } from "react";
import { Typography, Icon, IconButton, Box } from "../";
import { validators } from "investira.sdk";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

const Root = styled("div")(({ color, close, theme }) => {
  return {
    position: "relative",
    padding: "0.6rem 1rem",
    marginBottom: "1rem",
    borderRadius: "0.5rem",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    wordBreak: "break-word",
    ...(color === "primary" && {
      backgroundColor: theme.palette.primary.main,
    }),
    ...(color === "secondary" && {
      backgroundColor: theme.palette.secondary.main,
    }),
    ...(color === "secondaryLight" && {
      backgroundColor: theme.palette.secondary.light,
    }),
    ...(color === "secondaryDark" && {
      backgroundColor: theme.palette.secondary.dark,
    }),
    ...(color === "secondaryDarkness" && {
      backgroundColor: theme.palette.secondary.darkness,
    }),
    ...(color === "warn" && {
      backgroundColor: theme.palette.warning.main,
    }),
    ...(color === "error" && {
      backgroundColor: theme.palette.error.main,
    }),
    ...(color === "info" && {
      backgroundColor: theme.palette.info.main,
    }),
    ...(color === "infoLight" && {
      backgroundColor: theme.palette.info.light,
    }),
    ...(close && { justifyContent: "space-between" }),
  };
});

const Alerts = memo((props) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  if (!open) {
    return null;
  } else {
    return (
      <Root close={props.close} color={props.backgroundColor}>
        {!validators.isEmpty(props.iconName) && (
          <Box pr={1.5}>
            <Icon
              size={21}
              color={props.color || "black"}
              iconName={props.iconName}
            />
          </Box>
        )}
        <Box flexGrow={1}>
          <Typography variant={"caption"} color={props.color || "inherit"}>
            {props.children}
          </Typography>
        </Box>
        {props.close && (
          <IconButton edge={"end"} onClick={handleClose}>
            <Icon
              size={12}
              color={props.color || "black"}
              iconName={"cancel"}
            />
          </IconButton>
        )}
      </Root>
    );
  }
});

Alerts.propTypes = {
  backgroundColor: PropTypes.oneOf([
    "default",
    "inherit",
    "primary",
    "secondary",
    "secondaryLight",
    "secondaryDark",
    "secondaryDarkness",
    "warn",
    "error",
    "info",
    "infoLight",
  ]),
  color: PropTypes.string,
  iconName: PropTypes.string,
  open: PropTypes.bool,
  close: PropTypes.bool,
};

Alerts.defaultProps = {
  backgroundColor: "default",
  open: true,
  close: true,
};

export default Alerts;

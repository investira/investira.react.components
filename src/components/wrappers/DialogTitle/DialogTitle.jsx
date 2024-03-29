import React from "react";
import MuiDialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Icon from "../../Icon";

const DialogTitle = (props) => {
  const { children, classes, onClose, ...otherProps } = props;

  const xIconButtonProps = {
    edge: "end",
    "aria-label": "close",
    color: "primary",
    style: { pointerEvents: "all" },
    ...(onClose && { onClick: onClose }),
  };

  return (
    <MuiDialogTitle {...otherProps}>
      {children}
      {onClose ? (
        <IconButton {...xIconButtonProps}>
          <Icon iconName={"cancel"} size={18} />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

export default DialogTitle;

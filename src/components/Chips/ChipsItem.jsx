import React, { memo } from "react";
import { Chip } from "../wrappers";

const ChipsItem = memo((props) => {
  const { id, data, onClick, onDelete, size } = props;
  const { value, label, avatar, icon, disabled } = data;
  const xVariant = props.focused === props.id ? "default" : "outlined";

  return (
    <Chip
      key={id}
      onClick={onClick}
      onDelete={onDelete}
      value={value}
      label={label}
      avatar={avatar}
      icon={icon}
      color={"primary"}
      clickable={false}
      variant={xVariant}
      disabled={disabled || false}
      size={size}
      sx={props.sx}
    />
  );
});

export default ChipsItem;

import React, { memo } from "react";
import { Chip } from "../wrappers";

const ChipsItem = memo((props) => {
  const { id, data, onClick, onDelete } = props;
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
    />
  );
});

export default ChipsItem;

import React from "react";
import PropTypes from "prop-types";
import { Typography, Icon, Box } from "../";

const Rate = (props) => {
  const elem = [
    { icon: "arrow_negative", color: "var(--color-danger)" },
    { icon: "arrow_positive", color: "var(--color-primary)" },
    { icon: "none", color: "var(--color-warning)" },
  ];

  const attrs = (pValue) => {
    if (pValue < 0) {
      return elem[0];
    }

    if (pValue > 0) {
      return elem[1];
    }

    if (pValue === 0) {
      return elem[2];
    }
  };

  const xValue = props.value ? props.value.toFixed(2) : 0;

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      style={{
        color: props.contrastColor || attrs(props.value || 0).color,
      }}
    >
      <Typography variant={"caption"}>
        <span>{xValue}%</span>
      </Typography>

      <Icon
        size={props.size || 16}
        iconName={attrs(props.value || 0).icon}
        color={"inherit"}
      />
    </Box>
  );
};

Rate.propTypes = {
  value: PropTypes.number,
  size: PropTypes.number,
  contrastColor: PropTypes.string,
};

export default React.memo(Rate);

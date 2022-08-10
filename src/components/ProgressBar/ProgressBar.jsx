import React from "react";
import { Box } from "../";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const Span = styled(Box)(({ animate }) => ({
  position: "absolute",
  display: "block",
  height: "100%",
  borderRadius: "3px",
  transition: "width 500ms ease-in-out",
  ...(animate === "indeterminate" && {
    "@keyframes increase": {
      from: {
        left: "-5%",
        width: "5%",
      },
      to: {
        left: "130%",
        width: "100%",
      },
    },
    "@keyframes decrease": {
      from: {
        left: "-80%",
        width: "80%",
      },
      to: {
        left: "110%",
        width: "10%",
      },
    },
    "&:first-child": {
      animation: "increase 2s infinite",
    },

    "&:last-child": {
      animation: "decrease 2s 0.5s infinite",
    },
  }),
}));
function ProgressBar(props) {
  return (
    <Box
      sx={[
        (theme) => ({
          position: "relative",
          width: "100%",
          backgroundColor: theme.palette.background.light,
          borderRadius: "3px",
          minHeight: "6px",
          boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.2)",
          overflowX: "hidden",
        }),
      ]}
    >
      <Span
        component="span"
        style={{
          width: `${String(props.value)}%`,
          backgroundColor: `var(--color-${props.color})`,
        }}
      ></Span>
      <Span
        style={{
          backgroundColor: `var(--color-${props.color})`,
        }}
      ></Span>
    </Box>
  );
}

ProgressBar.propTypes = {
  color: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  animate: PropTypes.oneOf(["indeterminate", "progress"]),
};

ProgressBar.defaultProps = {
  color: "primary",
  value: 100,
  animate: "progress",
};

export default ProgressBar;

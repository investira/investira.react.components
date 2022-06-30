import React from "react";
import { Typography, Box } from "../";
import { validators } from "investira.sdk";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const Root = styled(Box)(({ gutter, direction }) => ({
  ...(gutter === "full" && {
    margin: "0px 16px",
  }),
  ...(gutter === "left" && {
    marginLeft: "16px",
  }),
  ...(gutter === "right" && {
    marginRight: "16px",
  }),
  ...(direction === "horizontal" && {
    display: "flex",
    alignItems: "center",
  }),
}));

const Margin = styled(Box)(({ direction }) => ({
  ...(direction === "horizontal" && {
    marginRight: "8px",
  }),
}));
function Info(props) {
  return (
    <Root id={props.label} onClick={props.onClick}>
      <Margin>
        <Typography
          variant={props.variant}
          color={props.labelColor}
          gutterBottom={props.gutterBottom}
          component="p"
        >
          {props.label}
          {(props.colon || props.direction === "horizontal") && ":"}
        </Typography>
      </Margin>
      {validators.isEmpty(props.value) ? (
        <Typography
          variant={props.variantValue}
          color={props.valueColor}
          gutterBottom={props.gutterBottom}
          component="p"
        >
          --
        </Typography>
      ) : props.bold ? (
        <Typography
          variant={props.variantValue || props.variant}
          color={props.valueColor}
          gutterBottom={props.gutterBottom}
          component="p"
        >
          <b> {props.value} </b>
        </Typography>
      ) : (
        <Typography
          variant={props.variantValue || props.variant}
          color={props.valueColor}
          gutterBottom={props.gutterBottom}
          component="p"
        >
          {props.value}
        </Typography>
      )}
    </Root>
  );
}

Info.defaultProps = {
  variant: "caption",
  labelColor: "textSecondary",
  gutterBottom: true,
  valueColor: "textPrimary",
  variantValue: "caption",
  direction: "vertical",
  colon: false,
  bold: false,
};

Info.propTypes = {
  onClick: PropTypes.func,
  direction: PropTypes.oneOf(["vertical", "horizontal"]),
  colon: PropTypes.bool,
  bold: PropTypes.bool,
  gutter: PropTypes.oneOf(["left", "full", "right"]),
  gutterBottom: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string,
  variantValue: PropTypes.string,
  labelColor: PropTypes.string,
  valueColor: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default Info;

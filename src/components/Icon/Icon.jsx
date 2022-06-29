import React, { memo } from "react";
import PropTypes from "prop-types";
import { validators } from "investira.sdk";
import { styled } from "@mui/material/styles";

const Svg = styled("svg")(({ color, theme }) => {
  return {
    userSelect: "none",
    display: "inline-block",
    fontSize: "24",
    overflow: "hidden",
    flexShrink: "0",
    strokeWidth: "0",
    stroke: "currentColor",
    fill: "currentColor",

    ...(color === "primary" && {
      stroke: theme.palette.primary.main,
      fill: theme.palette.primary.main,
    }),
    ...(color === "primaryLightness" && {
      stroke: theme.palette.primary.main,
      fill: theme.palette.primary.main,
    }),
    ...(color === "secondary" && {
      stroke: theme.palette.primary.main,
      fill: theme.palette.primary.main,
    }),
    ...(color === "secondaryLight" && {
      stroke: theme.palette.primary.main,
      fill: theme.palette.primary.main,
    }),
    ...(color === "primaryDarkness" && {
      stroke: theme.palette.primary.main,
      fill: theme.palette.primary.main,
    }),
    ...(color === "warn" && {
      stroke: theme.palette.primary.main,
      fill: theme.palette.primary.main,
    }),
    ...(color === "danger" && {
      stroke: theme.palette.error.main,
      fill: theme.palette.error.main,
    }),
    ...(color === "error" && {
      stroke: theme.palette.error.main,
      fill: theme.palette.error.main,
    }),
    ...(color === "infoLight" && {
      stroke: theme.palette.primary.main,
      fill: theme.palette.primary.main,
    }),
    ...(color === "info" && {
      stroke: theme.palette.primary.main,
      fill: theme.palette.primary.main,
    }),
    ...(color === "infoDark" && {
      stroke: theme.palette.primary.main,
      fill: theme.palette.primary.main,
    }),
    ...(color === "infoHighlight" && {
      stroke: theme.palette.primary.main,
      fill: theme.palette.primary.main,
    }),
    ...(color === "textPrimary" && {
      stroke: theme.palette.primary.main,
      fill: theme.palette.primary.main,
    }),
    ...(color === "textSecondary" && {
      stroke: theme.palette.primary.main,
      fill: theme.palette.primary.main,
    }),
    ...(color === "black" && {
      stroke: theme.palette.primary.main,
      fill: theme.palette.primary.main,
    }),
    ...(color === "greenLight" && {
      fill: 'url("#icon-component-gradient-greenLight")',
    }),
    ...(color === "orangeLight" && {
      fill: 'url("#icon-component-gradient-orangeLight")',
    }),

    "@media not all and (min-resolution: 0.001dpcm)": {
      "@supports (-webkit-appearance: none) and (stroke-color: transparent)": {
        ...(color === "greenLight" && {
          stroke: theme.palette.primary.main,
          fill: theme.palette.primary.main,
        }),
        ...(color === "orangeLight" && {
          stroke: theme.palette.error.main,
          fill: theme.palette.error.main,
        }),
      },
    },
  };
});

const Icon = memo((props) => {
  const xIconName = "-i_" + props.iconName;

  const xGradientTypes = {
    greenLight: ["#0ae1a3", "#0bbbd0"],
    orangeLight: ["#F38A1D", "#FC602D"],
  };

  const isValidSize = (pSize) => {
    return validators.isNumber(pSize) ? `${pSize}px` : "24px";
  };

  const isGradient = (pColorProp) => {
    return Object.keys(xGradientTypes).includes(pColorProp);
  };

  const defs = (pColor) => {
    if (!isGradient(pColor)) {
      return null;
    }

    return (
      <defs>
        {Object.keys(xGradientTypes).map((xKey) => {
          return (
            <linearGradient
              key={xKey}
              id={`icon-component-gradient-${xKey}`}
              x2="1"
              y2="1"
              gradientUnits="objectBoundingBox"
            >
              <stop offset={0} stopColor={xGradientTypes[xKey][0]} />
              <stop offset={1} stopColor={xGradientTypes[xKey][1]} />
            </linearGradient>
          );
        })}
      </defs>
    );
  };

  if (validators.isEmpty(props.iconName)) {
    return null;
  } else {
    return (
      <Svg
        width={isValidSize(props.size)}
        height={isValidSize(props.size)}
        className={[xIconName, props.className].join("")}
        color={props.color}
        size={props.size}
        style={props.style}
        viewBox={"0 0 24 24"}
      >
        {defs(props.color)}
        <use href={`#${xIconName}`} xlinkHref={`#${xIconName}`} />
      </Svg>
    );
  }
});

Icon.propTypes = {
  size: PropTypes.number,
  iconName: PropTypes.string,
  className: PropTypes.string,
  classes: PropTypes.object,
  color: PropTypes.oneOf([
    "default",
    "inherit",
    "primary",
    "primaryLightness",
    "secondary",
    "secondaryLight",
    "primaryDarkness",
    "warn",
    "danger",
    "error",
    "infoLight",
    "info",
    "infoDark",
    "infoHighlight",
    "textPrimary",
    "textSecondary",
    "black",
    "greenLight",
    "orangeLight",
  ]),
};

Icon.defaultProps = {
  color: "default",
  size: 24,
};

export default Icon;

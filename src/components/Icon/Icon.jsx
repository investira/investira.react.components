import React, { memo } from "react";
import PropTypes from "prop-types";
import { validators } from "investira.sdk";
import { styled, alpha } from "@mui/material/styles";

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
      stroke: theme.palette.primary.lightness,
      fill: theme.palette.primary.lightness,
    }),
    ...(color === "secondary" && {
      stroke: theme.palette.secondary,
      fill: theme.palette.secondary,
    }),
    ...(color === "secondaryLight" && {
      stroke: theme.palette.secondary.light,
      fill: theme.palette.secondary.light,
    }),
    ...(color === "primaryDarkness" && {
      stroke: theme.palette.primary.darkness,
      fill: theme.palette.primary.darkness,
    }),
    ...(color === "warn" && {
      stroke: theme.palette.warning,
      fill: theme.palette.warning,
    }),
    ...(color === "danger" && {
      stroke: theme.palette.danger,
      fill: theme.palette.danger,
    }),
    ...(color === "error" && {
      stroke: theme.palette.danger,
      fill: theme.palette.danger,
    }),
    ...(color === "infoLight" && {
      stroke: theme.palette.info.light,
      fill: theme.palette.info.light,
    }),
    ...(color === "info" && {
      stroke: theme.palette.info,
      fill: theme.palette.info,
    }),
    ...(color === "infoDark" && {
      stroke: theme.palette.info.dark,
      fill: theme.palette.info.dark,
    }),
    ...(color === "infoHighlight" && {
      stroke: theme.palette.info.highlight,
      fill: theme.palette.info.highlight,
    }),
    ...(color === "textPrimary" && {
      stroke: alpha(theme.palette.white, 0.9),
      fill: alpha(theme.palette.white, 0.9),
    }),
    ...(color === "textSecondary" && {
      stroke: theme.palette.secondary.lightness,
      fill: theme.palette.secondary.lightness,
    }),
    ...(color === "black" && {
      stroke: theme.palette.black,
      fill: theme.palette.black,
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
  // className: PropTypes.string,
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

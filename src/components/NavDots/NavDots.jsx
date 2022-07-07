import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Box, Stack } from "../";
import { styled, alpha } from "@mui/material/styles";
import Style from "./NavDots.module.scss";
import { ButtonBase } from "../wrappers";

function NavDots(props) {
  const [wrapWidth, setWrapWidth] = useState(window.screen.width);
  const [wrapPosition, setWrapPosition] = useState(0);

  const btnRef = useRef();

  const handleClick = (pIndex) => {
    props.onClick && props.onClick(pIndex);
  };

  const navigation = (pSize, pIndex, pDotWidth) => {
    const xTotalDots = pSize;
    const xTotalVisible = 5;
    const xOffset = 3;
    const xIntervalo = xTotalDots - xTotalVisible;
    const xWalker = pIndex + xOffset;
    const xMultiply = xTotalDots - (xWalker + xIntervalo);

    if (pIndex >= xTotalVisible - xOffset && pIndex <= xTotalDots - xOffset) {
      const xNewPos = pDotWidth * xMultiply;
      setWrapPosition(xNewPos);
    } else if (pIndex < xTotalVisible - xOffset) {
      const xStartPos = 0;
      setWrapPosition(xStartPos);
    } else if (pIndex > xTotalDots - xOffset) {
      const xEndPos = (xTotalDots - xTotalVisible) * pDotWidth;
      setWrapPosition(xEndPos * -1);
    }
  };

  useEffect(() => {
    setWrapWidth(
      props.size > 5 ? btnRef.current.offsetWidth * props.size : "100%"
    );
  }, []);

  useEffect(() => {
    if (props.size > 5) {
      navigation(props.size, props.index, btnRef.current.offsetWidth);
    }
  }, [props.index]);

  const xChilds = [];

  const xClassWrap = classNames(Style.wrap, props.className, {
    [Style.wrapJustifyStart]: props.size > 5,
  });

  for (let xI = 0; xI < props.size; xI++) {
    xChilds.push(
      <div ref={btnRef} key={xI}>
        <ButtonBase centerRipple={true} onClick={() => handleClick(xI)}>
          <Box py={1} px={"13px"}>
            <Box
              component="span"
              sx={[
                (theme) => (
                  {
                    display: "inline-block",
                    p: 0.5,
                    borderRadius: "50%",
                    backgroundColor: alpha(theme.palette.common.white, 0.9),
                    transition: "all 0.2s ease-in-out",
                  },
                  props.index === xI && {
                    backgroundColor: theme.palette.primary,
                    transform: "scale(1.5)",
                  }
                ),
              ]}
            />

            <span
              className={`${Style.dot} ${
                props.index === xI ? Style.actived : ""
              }`}
            />
          </Box>
        </ButtonBase>
      </div>
    );
  }

  return (
    <div className={Style.root}>
      <div
        className={xClassWrap}
        style={{
          width: wrapWidth,
          transform: `translate(${wrapPosition}px,0px)`,
        }}
      >
        {xChilds}
      </div>
    </div>
  );
}

NavDots.propTypes = {
  onClick: PropTypes.func,
  size: PropTypes.number,
};

export default NavDots;

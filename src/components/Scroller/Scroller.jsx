import React, { useRef } from "react";
import { Box } from "../";
import { browsers } from "investira.react.lib";

function Scroller(props) {
  let scrollTimer = null;
  let lastScrollY = null;
  let scrollRef = useRef();

  // Teste contra freezing scroll no ios
  const handleScroll = (pEvent) => {
    if (browsers.isIOS()) {
      const xScrolledElem = pEvent.target;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        xScrolledElem.scrollTop = Math.max(
          1,
          Math.min(
            xScrolledElem.scrollTop,
            xScrolledElem.scrollHeight - xScrolledElem.clientHeight - 1
          )
        );
        lastScrollY = xScrolledElem.scrollTop;
      }, 300);
    }
  };

  const handleTouchStart = (pEvent) => {
    forceScroll(pEvent, lastScrollY);
  };

  const handleTouchEnd = (pEvent) => {};

  const forceScroll = (pEvent, pLastY) => {
    if (browsers.isIOS()) {
      const xCurrentTarget = pEvent.target;
      xCurrentTarget.scrollTop = pLastY - 1;
    }
  };

  return (
    <Box
      component="section"
      id={props.id}
      ref={scrollRef}
      sx={{
        WebkitOverflowScrolling: "touch",
        scrollBehavior: "smooth",
        overflowY: "scroll",
        overflowX: "hidden",
        height: "100%",
        width: "100%",
      }}
      onScroll={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {props.children}
    </Box>
  );
}

export default Scroller;

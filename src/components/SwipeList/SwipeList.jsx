import React, { memo, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { validators } from "investira.sdk";
import contact from "contactjs";
import { Box, Stack, Grid } from "../";

const SwipeList = memo((props) => {
  console.log("SwipeList", props);

  const areaRef = useRef(null);
  const warpRef = useRef(null);
  const itemsRef = [];

  const xId = `swipe-list-${props.id}`;
  const Component = props.child;

  const handleClick = (pData, pIndex, pEvent) => () => {
    if (props.onClick) {
      props.onClick(pData, pIndex, pEvent);
    }
  };

  function getElemRect(pElemRef) {
    console.log("getItemRect", pElemRef);
  }

  useEffect(() => {
    console.log("areaRef.current", areaRef.current);
    console.log("warpRef.current", warpRef.current);
    console.log("itemsRef", itemsRef);
    if (!validators.isEmpty(itemsRef)) {
      getElemRect(itemsRef[0]);
    }
  }, [props.data]);

  return (
    <Stack
      id={xId}
      ref={areaRef}
      sx={{
        touchAction: "pan-y",
        position: "relative",
        overflow: "overflow-x",
        maxHeight: "100%",
      }}
    >
      <Stack ref={warpRef} direction="row" spacing={1} mx={2} flexGrow={1}>
        {!validators.isEmpty(props.data) &&
          Object.values(props.data).map((xItem, xIndex) => {
            const xElemKey = `${xId}-${xIndex}`;
            return (
              <div
                key={xElemKey}
                id={xElemKey}
                ref={(elem) => (itemsRef[xIndex] = elem)}
                data-index={xIndex}
              >
                <Component
                  {...props.childProps}
                  data={xItem}
                  onClick={(e) => handleClick(xItem, xIndex, e)}
                />
              </div>
            );
          })}
      </Stack>
    </Stack>
  );
});

SwipeList.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  child: PropTypes.elementType.isRequired,
  childProps: PropTypes.object,
  keyValue: PropTypes.string,
  stepInicialFocus: PropTypes.number,
};

SwipeList.defaultProps = {
  id: "default",
  data: [],
  stepInicialFocus: 0,
};

export default SwipeList;

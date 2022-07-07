import React, { useEffect, useState, useRef } from "react";
import { Box, Stack } from "../";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { validators } from "investira.sdk";

const Container = styled(Stack)(() => ({
  overflowY: "auto",
  overflowX: "scroll",
  flexDirection: "row",
  boxSizing: "content-box",
  paddingBottom: "17px",
  scrollBehavior: "smooth",
  WebkitOverflowScrolling: "touch",
  MsOverflowStyle: "none", // IE 10+
  scrollbarWidth: "none", // Firefox
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const Child = styled(Box)(() => ({
  height: "100%",
  padding: "0px 4px",

  "&:first-of-type": {
    paddingLeft: "16px",
  },

  "&:last-of-type": {
    paddingRight: "16px",
  },
}));

const HorizontalList = (props) => {
  const isMount = useRef(false);
  const elementsRef = [];
  let timeout = null;
  let isScrolling = false;
  let isClicked = false;

  const scrollableRef = React.useRef();
  const [elemFocusIndex, setElemFocusIndex] = useState(0);
  const [childFocused, setChildFocused] = useState(props.id + "0");
  const [initElementsRef, setInitElementsRef] = useState([]);
  const [positions, setPositions] = useState([0]);

  // Centraliza o elemento selecionado
  const centerInScroll = (pIndex) => {
    window.clearTimeout(timeout);
    const xSelected = pIndex || 0;

    const xFocusElemRect = initElementsRef[xSelected].getBoundingClientRect();

    const xScrollElem = scrollableRef.current;

    if (xScrollElem) {
      const xScrollElemRect = xScrollElem.getBoundingClientRect();
      const xSpacer = (xScrollElemRect.width - xFocusElemRect.width) / 2;

      xScrollElem.scrollLeft = positions[xSelected] - xSpacer;
    }

    isClicked = false;
  };

  const calcPosition = (pElemtsRect) => {
    let xPositions = [0];
    const xTotalArea = pElemtsRect.reduce((xAcumm, xCurrentValue) => {
      const xValue = xAcumm + xCurrentValue.width;
      xPositions.push(xValue);
      return xValue;
    }, 0);

    xPositions = xPositions.filter((xValue) => {
      return xValue !== xTotalArea;
    });

    return xPositions;
  };

  // Armazena a posição inicial de cada elemento da lista
  const saveElemsInitPosition = (pElemList) => {
    const xInitElemsRect = pElemList.map((elem) => {
      return elem.getBoundingClientRect();
    });

    const xPositions = calcPosition(xInitElemsRect);

    setPositions(xPositions);
  };

  const handleClick = (pData, pIndex) => () => {
    window.clearTimeout(timeout);
    isClicked = true;
    setElemFocusIndex(pIndex);
    //xPersistElemFocusIndex.current = pIndex;
    setChildFocused(props.id + pIndex);
    centerInScroll(pIndex);
    props.childProps.onClick && props.childProps.onClick(pData, pIndex);
  };

  const handleScroll = (e) => {
    window.clearTimeout(timeout);

    if (isScrolling || !isClicked) {
      timeout = setTimeout(() => {
        isScrolling = false;
        centerInScroll(elemFocusIndex);
      }, 2000);
    }
    isScrolling = true;
  };

  useEffect(() => {
    setElemFocusIndex(props.initialFocus);
    setChildFocused(props.id + props.initialFocus);
    setPositions([props.initialFocus]);
  }, []);

  useEffect(() => {
    window.clearTimeout(timeout);

    if (isMount.current && validators.isNull(initElementsRef[elemFocusIndex])) {
      setElemFocusIndex(0);
      setChildFocused(props.id + 0);
      centerInScroll(0);
    }
  }, [initElementsRef]);

  useEffect(() => {
    isMount.current = true;

    if (!validators.isEmpty(elementsRef)) {
      saveElemsInitPosition(elementsRef);
      setInitElementsRef([...elementsRef]);
    }
    //Unmount
    return () => {
      isMount.current = false;
      window.clearTimeout(timeout);
    };
  }, []);

  // Update
  useEffect(() => {
    window.clearTimeout(timeout);

    if (!validators.isEmpty(elementsRef)) {
      saveElemsInitPosition(elementsRef);
      setInitElementsRef([...elementsRef]);
    }
  }, [props.data]);

  const Component = props.child;

  return (
    <Box sx={{ overflow: "hidden", willChange: "overflow" }}>
      <Container
        id={props.id}
        ref={scrollableRef}
        scroll-behavior="smooth"
        onScroll={(e) => handleScroll(e)}
      >
        {!validators.isEmpty(props.data) &&
          props.data.map((xData, xIndex) => {
            const xCustomKey = props.keyValue
              ? `_${xData[props.keyValue]}`
              : "";
            const xKey = `${props.id}_${xIndex}${xCustomKey}`;

            return (
              <Child
                id={xKey}
                key={xKey}
                ref={(elem) => (elementsRef[xIndex] = elem)}
              >
                <Component
                  {...props.childProps}
                  id={props.id + xIndex}
                  focused={childFocused}
                  data={xData}
                  onClick={handleClick(xData, xIndex)}
                />
              </Child>
            );
          })}
      </Container>
    </Box>
  );
};

HorizontalList.propTypes = {
  id: PropTypes.string.isRequired,
  child: PropTypes.elementType.isRequired,
  childProps: PropTypes.object,
  data: PropTypes.array.isRequired,
  keyValue: PropTypes.string,
  initialFocus: PropTypes.number, //index
};

HorizontalList.defaultProps = {
  data: [],
  initialFocus: 0,
};

// export default HorizontalList;
export default React.memo(HorizontalList);

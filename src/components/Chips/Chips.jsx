import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { Typography, Chip } from "../wrappers";
import unsupportedProp from "../utils/unsupportedProp";
import Style from "./Chips.module.scss";
import PropTypes from "prop-types";
import { validators } from "investira.sdk";

function Chips(props) {
  const [focus, setFocus] = useState(null);
  const [keepFocus, setKeepFocus] = useState(true);
  const [data, setData] = useState([]);
  const [initialFocus, setInitialFocus] = useState(true);

  let chipsList = [];
  let xElemsReact = [];
  const scrollableRef = useRef();
  let elemFocusIndex = 0;
  let timeout = null;

  const forwardRef = (pRef) => {
    scrollableRef.current = pRef;
  };

  function centerInScroll(pIndex) {
    const xSelected = pIndex || 0;
    const xFocusElem = chipsList[xSelected];
    if (xFocusElem) {
      const xFocusElemRect = xFocusElem.getBoundingClientRect();
      const xScrollElem = scrollableRef.current;
      const xScrollElemRect = xScrollElem.getBoundingClientRect();
      const xSpacer = (xScrollElemRect.width - xFocusElemRect.width) / 2;

      xScrollElem.scrollLeft = xElemsReact[xSelected].x - xSpacer;
    }
    window.clearTimeout(timeout);
  }

  const handleClick = (pData, pIndex) => () => {
    centerInScroll(pIndex);
    elemFocusIndex = pIndex;
    setFocus(pData.value);

    props.onClick && props.onClick(pData, pIndex);
  };

  const handleScroll = () => {
    window.clearTimeout(timeout);

    timeout = setTimeout(() => {
      centerInScroll(elemFocusIndex);
    }, 2000);
  };

  const handleDelete = (pData) => {
    const xData = [...data];
    const deleteChip = xData.indexOf(pData);
    xData.splice(deleteChip, 1);
    setData(xData);
    props.onDelete(pData);
  };

  function getChipsPosition(pElement) {
    pElement && xElemsReact.push(pElement.getBoundingClientRect());
  }

  function chipFocusfy(pFocus) {
    for (let xI = 0; xI < chipsList.length; xI++) {
      const xElement = chipsList[xI];
      getChipsPosition(xElement);
    }
  }

  function initFocus(pFocus) {
    const xChipsList = chipsList.filter((xElem) => {
      return xElem !== null;
    });

    for (let xI = 0; xI < xChipsList.length; xI++) {
      const xElement = xChipsList[xI];

      if (xElement.children[0].id === pFocus) {
        centerInScroll(xI);
        elemFocusIndex = xI;
      }
    }

    setInitialFocus(false);
  }

  function focusStyle(pFocus) {
    let xFocus = focus || props.initialFocus;
    let style = {
      color: "var(--color-black-90)",
      backgroundColor: "var(--color-primary)",
    };

    if (pFocus === xFocus && keepFocus) {
      return style;
    }

    return {};
  }

  useEffect(() => {
    setFocus(props.initialFocus);
    setData(Object.values(props.data));
    return () => {
      timeout && window.clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    chipFocusfy(props.initialFocus);
    if (initialFocus) {
      initFocus(props.initialFocus);
    }
  }, [props.initialFocus]);

  useEffect(() => {
    setFocus(props.initialFocus);
    setData(Object.values(props.data));
  }, [props.data]);

  useEffect(() => {
    initFocus(focus);
  }, [focus]);

  const chips = data.map((pObj, pIndex) => {
    return (
      <div
        key={pIndex}
        ref={(elem) => (chipsList[pIndex] = elem)}
        className={Style.chipContainer}
      >
        <Chip
          id={pObj.value}
          key={pObj.value}
          style={focusStyle(pObj.value)}
          avatar={pObj.avatar}
          icon={pObj.icon}
          label={pObj.label}
          color={"primary"}
          onClick={handleClick(pObj, pIndex)}
          clickable={false}
          variant={props.variant}
          onDelete={props.onDelete && handleDelete(pObj)}
          disabled={pObj.disabled || false}
        />
      </div>
    );
  });

  const xClassName = classNames(Style.root, {
    [Style.withLabel]: !validators.isEmpty(props.label),
  });

  return (
    <div className={xClassName} onScroll={() => handleScroll()}>
      {props.label && (
        <div className={Style.chipsLabel}>
          <Typography variant={"caption"} color={"textSecondary"}>
            {props.label}
          </Typography>
        </div>
      )}
      {props.data ? (
        <div ref={scrollableRef} className={Style.horizontalScrollable}>
          {chips}
        </div>
      ) : (
        <Typography variant={"caption"} color={"textSecondary"}>
          Informe o atributo data
        </Typography>
      )}
    </div>
  );
}

Chips.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  children: unsupportedProp,
  label: PropTypes.string,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  variant: PropTypes.oneOf(["default", "outlined"]),
  deleteIcon: PropTypes.element,
  icon: PropTypes.element,
  keepFocus: PropTypes.bool,
};

Chips.defaultProps = {
  name: "default",
  color: "default",
  variant: "default",
  //keepFocus: true
};

export default Chips;

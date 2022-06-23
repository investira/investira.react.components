import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import unsupportedProp from "../utils/unsupportedProp";
import HorizontalList from "../HorizontalList";
import ChipsItem from "./ChipsItem";

function Chips(props) {
  const [data, setData] = useState([]);

  const handleClick = (pData, pIndex) => {
    props.onClick && props.onClick(pData, pIndex);
  };

  const handleDelete = (pItemData) => {
    const xData = [...data];
    const deleteChip = xData.indexOf(pItemData);
    xData.splice(deleteChip, 1);
    setData(xData);
    props.onDelete(pItemData);
  };

  useEffect(() => {
    setData(Object.values(props.data));
  }, [props.data]);

  return (
    <HorizontalList
      id={`chips-${props.id || "generico"}`}
      data={data}
      child={ChipsItem}
      childProps={{
        onClick: handleClick,
        ...(props.onDelete && { onDelete: handleDelete }),
      }}
      initialFocus={Number(props.initialFocus)}
    />
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
};

Chips.defaultProps = {
  name: "default",
  color: "default",
  variant: "default",
};

export default Chips;

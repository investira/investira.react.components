import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";
import Tooltip from "../wrappers/Tooltip";
import Style from "./CopyToClipboard.module.scss";

function CopyToClipboard(props) {
  const [iconName, setIconName] = useState("paper");
  const [tooltip, setTooltip] = useState("Copiar");

  let body = document.getElementsByTagName("body")[0];

  let timeout = null;

  const copyToClipboard = (pValue, pEvent) => {
    pEvent.stopPropagation();
    const tempInput = document.createElement("input");
    body.appendChild(tempInput);
    tempInput.setAttribute("value", pValue.toString());
    tempInput.select();
    document.execCommand("copy");
    body.removeChild(tempInput);

    setIconName("ok");
    setTooltip("COPIADO!");
  };

  const resetState = () => {
    timeout = setTimeout(() => {
      setIconName("paper");
      setTooltip("Copiar");
    }, 1000);
  };

  useEffect(() => {
    resetState();
  }, [iconName]);

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Tooltip title={tooltip} placement="top">
      <button
        className={Style.root}
        onClick={(e) => copyToClipboard(props.value, e)}
      >
        <Icon iconName={iconName} size={16} color={"primary"} />
      </button>
    </Tooltip>
  );
}

CopyToClipboard.propTypes = {
  value: PropTypes.string,
};

export default CopyToClipboard;

import React, { memo } from "react";
import { displays } from "investira.react.lib";
import Style from "./Highlight.module.scss";

const Highlight = memo((props) => {
  const xResult = displays.highlightSearch(props.query, props.text);

  return xResult.map((xPart, i) => {
    const xProps = {
      ...(xPart.isPesquisa && { className: Style.highlight }),
    };
    return (
      <span key={i} {...xProps}>
        {xPart.text}
      </span>
    );
  });
});

export default Highlight;

import React, { memo } from "react";
import { validators } from "investira.sdk";
import { displays } from "investira.react.lib";

import Style from "./Highlight.module.scss";

const Highlight = memo((props) => {
  if (validators.isEmpty(props.query)) {
    return <span>{props.text}</span>;
  }

  if (validators.isEmpty(props.text)) {
    return null;
  }

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

import React, { memo } from "react";
import { Box } from "../";
import { styled } from "@mui/material/styles";
import { validators } from "investira.sdk";
import { displays } from "investira.react.lib";

const Root = styled(Box)(({ theme, highlight }) => {
  return {
    fontWeight: "bold",
    ...(highlight && { color: theme.palette.primary.main }),
  };
});

const Highlight = memo((props) => {
  if (validators.isEmpty(props.query)) {
    return <span>{props.text}</span>;
  }

  if (validators.isEmpty(props.text)) {
    return null;
  }

  const xResult = displays.highlightSearch(props.query, props.text);

  return xResult.map((xPart, i) => {
    return (
      <Root component="span" key={i} highlight={xPart.isPesquisa}>
        {xPart.text}
      </Root>
    );
  });
});

export default Highlight;

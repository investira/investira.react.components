import React, { memo } from "react";
import { Box } from "../";
import { styled } from "@mui/material/styles";
import { validators } from "investira.sdk";
import { displays } from "investira.react.lib";

const Root = styled(Box)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.primary.main,
}));

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
      ...xPart.isPesquisa,
    };
    return (
      <Root component="span" key={i} {...xProps}>
        {xPart.text}
      </Root>
    );
  });
});

export default Highlight;

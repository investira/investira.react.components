import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Typography } from "..";

const Root = styled("fieldset")({
  border: "none",
  marginBottom: "24px",
});

const Legend = styled("legend")({
  marginBottom: "8px",
});

function Fieldset(props) {
  const { className, legend, children, ...otherProps } = props;

  return (
    <Root className={className} {...otherProps}>
      <Legend>
        <Typography variant={"caption"}>
          <b>{legend}</b>
        </Typography>
      </Legend>
      {children}
    </Root>
  );
}

Fieldset.propTypes = {
  children: PropTypes.node,
  legend: PropTypes.string,
};

export default Fieldset;

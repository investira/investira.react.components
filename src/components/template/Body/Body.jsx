import React from "react";
import PropTypes from "prop-types";
import { ErrorBoundary } from "../";
import { Box } from "../../";

const Body = (props) => {
  const { children, ...otherProps } = props;
  return (
    <ErrorBoundary>
      <Box position={"relative"} height={"100%"} {...otherProps}>
        {children}
      </Box>
    </ErrorBoundary>
  );
};

Body.propTypes = {
  children: PropTypes.element,
};

export default Body;

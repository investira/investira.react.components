import React from "react";
import PropTypes from "prop-types";
import { Box } from "../../";
function Skeleton(props) {
  if (React.Children.count(props.children) !== 2) {
    console.error("Skeleton deve possuir 2 elementos filhos");
    return null;
  }

  const navbar = props.children[0];
  const body = props.children[1];

  return (
    <Box
      component="section"
      sx={[
        {
          position: "relative",
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateAreas: "'head' 'body'",
          gridTemplateColumns: "100%",
        },
        props.variant === "dense" && {
          gridTemplateRows: "48px calc(100% - 48px)",
        },
        props.variant === "regular" && {
          gridTemplateRows: "56px calc(100% - 56px)",
        },
        props.variant === "large" && {
          gridTemplateRows: "64px calc(100% - 64px)",
        },
      ]}
    >
      <Box
        component="nav"
        sx={{
          gridArea: "head",
          display: "flex",
        }}
      >
        {React.cloneElement(navbar, { variant: props.variant })}
      </Box>
      <Box
        component="main"
        sx={{
          gridArea: "body",
          position: "relative",
        }}
      >
        {React.cloneElement(body, { variant: props.variant })}
      </Box>
    </Box>
  );
}

Skeleton.propTypes = {
  variant: PropTypes.string,
};

Skeleton.defaultProps = {
  variant: "regular",
};

export default Skeleton;

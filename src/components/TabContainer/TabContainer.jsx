import React from "react";
import { Box, Stack } from "../";
import PropTypes from "prop-types";

const TabContainer = (props) => {
  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <Stack
        id={`tab-${props.activeTab}`}
        sx={{ position: "relative", height: "100%" }}
      >
        {props.children[props.activeTab]}
      </Stack>
    </Box>
  );
};

TabContainer.propTypes = {
  activeTab: PropTypes.number,
};

export default React.memo(TabContainer);

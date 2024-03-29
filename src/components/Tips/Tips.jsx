import React, { memo, useState, useRef } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Icon, IconButton, JsonTextFormated, Stack, Box } from "../";

const Desc = styled(Box)(({ show }) => ({
  height: 0,
  overflow: "hidden",
  opacity: "0.5",
  transition: "all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)",
  ...(show && {
    opacity: "1",
    transition: "all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)",
  }),
}));

const Tips = memo((props) => {
  const descRef = useRef();
  const bodyRef = useRef();

  const [show, setShow] = useState(false);

  const handleToogle = () => {
    setShow(!show);
    const xDescElem = descRef.current;
    const xHeightSize = !show ? `${bodyRef.current.clientHeight}px` : "0";
    xDescElem.style.height = xHeightSize;
  };

  return (
    <Stack
      sx={{
        position: "relative",
        alignItems: "flex-start",
        flexDirection: "row",
      }}
    >
      <IconButton onClick={handleToogle}>
        <Icon iconName={props.iconName} size={props.size} color={props.color} />
      </IconButton>
      <Desc show={show} ref={descRef}>
        <Box ref={bodyRef} sx={{ p: "12px 8px" }}>
          <JsonTextFormated
            text={props.desc}
            color={"textSecondary"}
            variant={"caption"}
            component={"p"}
            gutterBottom
          />
        </Box>
      </Desc>
    </Stack>
  );
});

Tips.propTypes = {
  iconName: PropTypes.string,
  desc: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
};

Tips.defaultProps = {
  iconName: "lamp",
  desc: 'Utilize a prop "desc" para inserir uma descrição',
  size: 16,
  color: "primary",
};

export default Tips;

import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { CircularProgress, Backdrop, Typography } from "../wrappers";
import classNames from "classnames";

const Info = styled("div")({
  margin: "0 auto",
  width: "60%",
  textAlign: "center",
});

const HSpace = styled("div")({
  height: "24px",
});

const StyledBackdrop = styled(Backdrop, {
  shouldForwardProp: (prop) => prop !== "backgroundFlat",
})(({ theme, backgroundFlat }) => ({
  zIndex: theme.zIndex.drawer + 1,
  ...(backgroundFlat && {
    backgroundColor: theme.palette.background.default,
  }),
}));

function OverLoading(props) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const { backgroundFlat, message, color, variant, size, ...otherProps } = props;

  return (
    <StyledBackdrop backgroundFlat={backgroundFlat} open={open} {...otherProps}>
      {open && (
        <Info>
          <CircularProgress color="primary" size={size || 40} />
          <HSpace />
          {message && (
            <Typography
              color={color || "textPrimary"}
              align="center"
              variant={variant || "caption"}
            >
              {message}
            </Typography>
          )}
        </Info>
      )}
    </StyledBackdrop>
  );
}

export default OverLoading;

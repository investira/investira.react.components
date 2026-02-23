import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Backdrop, Typography, LinearProgress, Button } from "../wrappers";
import { Icon } from "../";

const StyledBackdrop = styled(Backdrop, {
  shouldForwardProp: (prop) => prop !== "backgroundFlat",
})(({ theme, backgroundFlat }) => ({
  zIndex: theme.zIndex.drawer + 1,
  ...(backgroundFlat && {
    backgroundColor: theme.palette.background.default,
  }),
}));

const Info = styled("div")({
  margin: "0 auto",
  width: "80%",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const HSpace = styled("div")({
  height: "16px",
});

const Action = styled("div")({
  position: "absolute",
  bottom: "24px",
});

const ProgressWrapper = styled("div")({
  paddingTop: "24px",
  width: "100%",
});

const Icons = styled("div")({
  position: "relative",
});

const Header = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "55px",
  padding: "16px",
});

function OverWaiting(props) {
  const [open, setOpen] = React.useState(false);

  const handleCancel = (pEvent) => {
    props.onCancel && props.onCancel(pEvent);
  };

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const { message, progressProps, typographyProps, header, backgroundFlat } =
    props;

  return (
    <StyledBackdrop backgroundFlat={backgroundFlat} open={open}>
      {open && (
        <>
          {header && <Header>{header}</Header>}
          <Info>
            <Icons>
              <Icon
                color={progressProps.color || "primary"}
                iconName="clock"
                size={128}
              />
            </Icons>

            <ProgressWrapper>
              <LinearProgress
                color={progressProps.color}
                variant={progressProps.variant}
                value={progressProps.value}
              />
              <HSpace />
              {message && (
                <Typography
                  color={typographyProps.color || "textPrimary"}
                  align="center"
                  variant={typographyProps.variant || "caption"}
                >
                  {message}
                </Typography>
              )}
            </ProgressWrapper>

            {props.cancelable && (
              <Action>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
              </Action>
            )}
          </Info>
        </>
      )}
    </StyledBackdrop>
  );
}

OverWaiting.propTypes = {
  open: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  message: PropTypes.string,
  progressProps: PropTypes.shape({
    color: PropTypes.oneOf(["primary", "secondary"]),
    value: PropTypes.number,
    variant: PropTypes.oneOf([
      "buffer",
      "determinate",
      "indeterminate",
      "query",
    ]),
  }),
  typographyProps: PropTypes.object,
  onCancel: PropTypes.func,
  cancelable: PropTypes.bool,
};

OverWaiting.defaultProps = {
  open: false,
  min: 0,
  max: 100,
  progressProps: {
    color: "primary",
    value: 100,
    variant: "indeterminate",
  },
  typographyProps: {
    color: "textPrimary",
    variant: "caption",
  },
  cancelable: true,
};

export default OverWaiting;

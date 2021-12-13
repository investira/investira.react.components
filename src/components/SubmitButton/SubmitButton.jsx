import React, { memo } from "react";
import PropTypes from "prop-types";
import { Button, CircularProgress } from "../";

import Style from "./SubmitButton.module.scss";

const SubmitButton = memo((props) => {
  const { children, isSubmitting, variant, disabled, ...restProps } = props;
  return (
    <div className={Style.root}>
      <Button
        {...restProps}
        type={"submit"}
        color={"primary"}
        variant={variant}
        disabled={disabled}
      >
        {children}
      </Button>
      {isSubmitting && (
        <div className={Style.submitting}>
          <CircularProgress size={24} />
        </div>
      )}
    </div>
  );
});

SubmitButton.propTypes = {
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  isSubmitting: PropTypes.bool,
};

SubmitButton.defaultProps = {
  variant: "outlined",
  disabled: false,
  isSubmitting: false,
};

export default SubmitButton;

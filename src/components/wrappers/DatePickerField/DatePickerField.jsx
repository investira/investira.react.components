import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import styled from "@emotion/styled";
import KeyboardDatePicker from "../KeyboardDatePicker";
import DatePicker from "../DatePicker";

const Root = styled("div")({
  position: "relative",
  marginBottom: "12px",
});

const DatePickerMode = ({
  field,
  form,
  mode,
  locale,
  disabled,
  locked,
  ...otherProps
}) => {
  const currentError = form.errors[field.name];
  const DatePickerProps = {
    id: field.id,
    name: field.name,
    value: field.value,
    locale: locale,
    margin: "normal",
    error: Boolean(currentError),
    fullWidth: true,
  };

  return (
    <Root>
      {mode === "input" ? (
        <KeyboardDatePicker
          format={"DD/MM/YYYY"}
          disabled={disabled || locked}
          {...DatePickerProps}
          {...otherProps}
          inputProps={{
            pattern: "[0-9]*",
          }}
        />
      ) : (
        <DatePicker
          format={"DD/MMM/YYYY"}
          disabled={disabled}
          locked={locked}
          {...DatePickerProps}
          {...otherProps}
        />
      )}
    </Root>
  );
};

const DatePickerField = (props) => {
  return (
    <Field
      {...props}
      id={props.id}
      name={props.id}
      value={props.value}
      component={DatePickerMode}
    />
  );
};

DatePickerField.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string,
  locale: PropTypes.string,
  mode: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  disabled: PropTypes.bool,
};

export default DatePickerField;

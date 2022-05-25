import React from "react";
import PropTypes from "prop-types";
import { default as MuiSelect } from "@mui/material/Select";
function Select({ children, ...restProps }) {
  return <MuiSelect {...restProps}>{children}</MuiSelect>;
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  helperText: PropTypes.func,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  fullWidth: PropTypes.bool,
  formControlProps: PropTypes.object,
};

export default Select;

import React from "react";
import { TextField } from "..";
import { DesktopDatePicker as MuiDesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import "moment/min/locales";

const DesktopDatePicker = (props) => {
  const { textFieldProps, ...restProps } = props;
  return (
    <LocalizationProvider
      dateAdapter={AdapterMoment}
      locale={props.locale || "pt-br"}
    >
      <MuiDesktopDatePicker
        {...restProps}
        renderInput={(params) => <TextField {...params} {...textFieldProps} />}
      />
    </LocalizationProvider>
  );
};

export default DesktopDatePicker;

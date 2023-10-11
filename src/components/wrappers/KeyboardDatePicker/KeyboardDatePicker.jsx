import React from "react";
import { TextField } from "..";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import "moment/min/locales";

const KeyboardDatePicker = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} locale={props.locale}>
      <MuiDatePicker
        {...props}
        refuse={/[^\d]+/gi}
        cancelLabel="fechar"
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default KeyboardDatePicker;

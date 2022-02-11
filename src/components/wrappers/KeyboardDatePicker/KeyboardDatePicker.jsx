import React from "react";
import { DatePicker as MuiDatePicker, LocalizationProvider } from "@mui/lab/";
import AdapterMoment from "@mui/lab/AdapterMoment";

import "moment/min/locales";

const KeyboardDatePicker = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} locale={props.locale}>
      <MuiDatePicker {...props} refuse={/[^\d]+/gi} cancelLabel="fechar" />
    </LocalizationProvider>
  );
};

export default KeyboardDatePicker;

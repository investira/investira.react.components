import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  MobileDatePicker as MuiMobileDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import brLocale from "date-fns/locale/pt-BR";

const MobileDatePicker = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={brLocale}>
      <MuiMobileDatePicker {...props} />
    </LocalizationProvider>
  );
};

export default MobileDatePicker;

import React from "react";
import { DesktopDatePicker as MuiDesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pt-br";

import "moment/min/locales";

const DesktopDatePicker = React.forwardRef((props, ref) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <MuiDesktopDatePicker ref={ref} {...props} />
    </LocalizationProvider>
  );
});

export default DesktopDatePicker;

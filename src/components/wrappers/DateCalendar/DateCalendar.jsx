import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar as MuiDateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "dayjs/locale/pt-br";

const DateCalendar = React.forwardRef((props, ref) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <MuiDateCalendar ref={ref} {...props} />
    </LocalizationProvider>
  );
});

export default DateCalendar;

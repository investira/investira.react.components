import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DayCalendarSkeleton as MuiDayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import "dayjs/locale/pt-br";

const DayCalendarSkeleton = React.forwardRef((props, ref) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <MuiDayCalendarSkeleton ref={ref} {...props} />
    </LocalizationProvider>
  );
});

export default DayCalendarSkeleton;

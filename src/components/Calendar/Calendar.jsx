import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  CalendarPicker as MuiCalendarPicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { styled } from "@mui/material/styles";
import brLocale from "date-fns/locale/pt-BR";

const CalendarPicker = styled(MuiCalendarPicker)(({ theme }) => ({
  width: "100%",
  "& > .MuiCalendarPicker-viewTransitionContainer": {
    "& > div": {
      "& > div:first-of-type": {
        justifyContent: "space-evenly",
      },
      "& > div:last-of-type div": {
        justifyContent: "space-evenly",
        "& > div": {
          margin: "4px 0",
        },
      },
    },
  },
}));

const Calendar = memo((props) => {
  const [date, setDate] = useState(new Date());
  const locale = "pt-BR";

  function handleChange(pNewDate) {
    setDate(pNewDate);
  }

  useEffect(() => {
    props.onChange(date);
  }, [date]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={brLocale}>
      <CalendarPicker
        value={date}
        onChange={handleChange}
        disableHighlightToday={props.disableHighlightToday}
      />
    </LocalizationProvider>
  );
});

Calendar.displayName = "Calendar";

Calendar.propTypes = {
  onChange: PropTypes.func,
  displayStaticWrapperAs: PropTypes.string,
  openTo: PropTypes.string,
  disableHighlightToday: PropTypes.bool,
};

Calendar.defaultProps = {
  onChange: () => {},
  displayStaticWrapperAs: "mobile",
  openTo: "year",
  disableHighlightToday: false,
};

export default Calendar;

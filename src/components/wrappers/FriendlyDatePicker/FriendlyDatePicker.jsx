import React from "react";
import styled from "@emotion/styled";
import classNames from "classnames";
import { Typography } from "../";
import { dates } from "investira.sdk";

const Root = styled("div")({
  position: "relative",
  display: "flex",
  justifyContent: "start",
  alignContent: "center",
  flexWrap: "wrap",
});

const Label = styled("div")({
  width: "100%",
});

const Day = styled("div")(({ theme }) => ({
  color: theme.palette.primary.main,
  textTransform: "uppercase",
}));

const Locked = styled("div")(({ theme }) => ({
  color: theme.palette.secondary.light,
}));

const FriendlyDatePicker = (props) => {
  const xMomentUtils = new props.utils({
    locale: props.locale,
  });
  const xCurrentDate = xMomentUtils.date(props.value);
  const xTodayDate = xMomentUtils.date(dates.toDate());

  const xDate = {
    year: xMomentUtils.getYearText(xCurrentDate),
    month: xMomentUtils.getMonthText(xCurrentDate),
    day: xMomentUtils.getDayText(xCurrentDate),
    today: xMomentUtils.isSameDay(xCurrentDate, xTodayDate),
  };

  const DayComponent = props.locked || props.disabled ? Locked : Day;

  return (
    <Root>
      <Label>
        <Typography color={"textSecondary"} variant={"caption"}>
          {props.label}
        </Typography>
      </Label>
      {xDate.today ? (
        <DayComponent>
          <div style={{ paddingTop: "19px" }}>
            <Typography color={"inherit"} variant={"h4"}>
              Hoje
            </Typography>
          </div>
        </DayComponent>
      ) : (
        <>
          <DayComponent>
            <Typography color={"inherit"} variant={"body2"}>
              {xDate.day} <span style={{ fontWeight: 500 }}>{xDate.month}</span>
            </Typography>
            <Typography color={"inherit"} variant={"h4"}>
              {xDate.year}
            </Typography>
          </DayComponent>
        </>
      )}
    </Root>
  );
};

export default FriendlyDatePicker;


import "react-datepicker/dist/react-datepicker.css";
import styles from './EventTimePicker.module.scss';
import { Stack } from "../Stack/Stack";
import { useState } from "react";
import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import { TimeRangePicker } from "@mui/x-date-pickers-pro/TimeRangePicker";


import React from "react";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export const TimeSelector = ({ timeRange, setTimeRange, allDay }) => {
  if (allDay) return null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MultiInputTimeRangeField
        value={timeRange}
        onChange={setTimeRange}
        format="HH:mm" // только часы и минуты
        slotProps={{
          textField: ({ position }) => ({
            label: position === "start" ? "Start Time" : "End Time (optional)",
          }),
        }}
        minTime={timeRange[0] || undefined} // endTime >= startTime
      />
    </LocalizationProvider>
  );
};

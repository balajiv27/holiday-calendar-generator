import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled } from "@mui/system";
import dayjs from "dayjs";
import { HexColorPicker } from "react-colorful";
import { Button } from "@mui/material";

const Event = (id) => {
  const [state, setState] = useState({
    eventName: "",
    eventDesc: "",
    eventDate: dayjs(),
    color: "#aabbcc",
  });

  const OnItemChanges = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const ResponsiveContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    "@media (min-width: 600px)": {
      flexDirection: "row",
      "& > *": {
        flex: 1,
        margin: "0 5px",
      },
    },
  });

  // useEffect(() => {}, [state]);

  return (
    <>
      <ResponsiveContainer>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TextField
            id={`event-name-${id}`}
            name="eventName"
            label="Event Name"
            variant="outlined"
            value={state.eventName}
            onChange={(e) => OnItemChanges(e)}
            autoFocus
          />
          <TextField
            id={`event-desc-${id}`}
            name="eventDesc"
            label="Event Description"
            variant="outlined"
            value={state.eventDesc}
            onChange={(e) => OnItemChanges(e)}
          />
          <DatePicker
            label="Event Date"
            name="eventDate"
            value={state.eventDate}
            defaultValue={dayjs()}
          />
          {/* <HexColorPicker
          color={state.color}
          name="color"
          onChange={(e) => OnItemChanges(e)}
        ></HexColorPicker> */}
        </LocalizationProvider>
      </ResponsiveContainer>
    </>
  );
};

export default Event;

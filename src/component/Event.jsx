import React, { useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled } from "@mui/system";
import { Button } from "@mui/material";

const Event = ({
  id,
  eventName,
  eventDesc,
  eventDate,
  onInputChange,
  focusedInput,
  setFocusedInput,
  focusedItem,
  setFocusedItem,
  deleteAt,
}) => {
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

  const inputEventRef = useRef(null);
  const inputEventDescRef = useRef(null);
  const inputEventDateRef = useRef(null);

  useEffect(() => {
    if (
      inputEventRef.current &&
      focusedInput === id &&
      focusedItem === "name"
    ) {
      inputEventRef.current.focus();
    } else if (
      inputEventDescRef.current &&
      focusedInput === id &&
      focusedItem === "desc"
    ) {
      inputEventDescRef.current.focus();
    } else if (
      inputEventDateRef.current &&
      focusedInput === id &&
      focusedItem === "date"
    ) {
      inputEventDateRef.current.focus();
    }
  }, [focusedInput, focusedItem, id]);

  const handleItemChange = (property, value) => {
    onInputChange(id, property, value);
  };

  const handleFocus = (type) => {
    setFocusedInput(id);
    setFocusedItem(type);
  };

  return (
    <>
      <ResponsiveContainer>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TextField
            inputRef={inputEventRef}
            id={`event-name-${id}`}
            name="eventName"
            label="Event Name"
            variant="outlined"
            value={eventName}
            onChange={(e) => handleItemChange("eventName", e.target.value)}
            onFocus={() => handleFocus("name")}
            autoFocus={focusedInput === id && focusedItem === "name"}
            required
          />
          <TextField
            inputRef={inputEventDescRef}
            id={`event-desc-${id}`}
            name="eventDesc"
            label="Event Description"
            variant="outlined"
            value={eventDesc}
            onChange={(e) => handleItemChange("eventDesc", e.target.value)}
            onFocus={() => handleFocus("desc")}
            autoFocus={focusedInput === id && focusedItem === "desc"}
          />
          <DatePicker
            inputRef={inputEventDateRef}
            label="Event Date"
            name="eventDate"
            value={eventDate}
            onChange={(date) => handleItemChange("eventDate", date)}
            onFocus={() => handleFocus("date")}
            autoFocus={focusedInput === id && focusedItem === "date"}
          />
          <Button onClick={() => deleteAt(id)}>{id} Delete</Button>
        </LocalizationProvider>
      </ResponsiveContainer>
    </>
  );
};

export default Event;

import React, { useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled } from "@mui/system";
import dayjs from "dayjs";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

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
  setEvents,
  events,
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

  const handleAddComponent = () => {
    setEvents((prevEvents) => [
      ...prevEvents,
      {
        id: prevEvents.length,
        eventName: "",
        eventDesc: "",
        eventDate: dayjs(),
      },
    ]);
    setFocusedInput(id + 1);
    setFocusedItem("name");
  };

  const handleFocus = (type) => {
    setFocusedInput(id);
    setFocusedItem(type);
  };

  return (
    <div className="event-card" style={{ animationDelay: `${id * 0.1}s` }}>
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
          <DateTimePicker
            inputRef={inputEventDateRef}
            label="Event Date & Time"
            name="eventDate"
            value={eventDate}
            onChange={(date) => handleItemChange("eventDate", date)}
            onFocus={() => handleFocus("date")}
            slotProps={{ textField: { variant: 'outlined' } }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {events.length === id + 1 && (
              <IconButton 
                className="add-icon"
                aria-label="add event" 
                onClick={handleAddComponent}
                title="Add new event"
              >
                <AddBoxIcon fontSize="large" />
              </IconButton>
            )}
            <IconButton 
              className="delete-icon"
              aria-label="delete event" 
              onClick={() => deleteAt(id)}
              title="Delete this event"
            >
              <DeleteIcon fontSize="large" />
            </IconButton>
          </div>
        </LocalizationProvider>
      </ResponsiveContainer>
    </div>
  );
};

export default Event;

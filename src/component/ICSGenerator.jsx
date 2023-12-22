import React, { useState } from "react";
import { styled } from "@mui/system";
import Event from "./Event";
import { Button } from "@mui/material";
import dayjs from "dayjs";

const ICSGenerator = () => {
  const [events, setEvents] = useState([
    { id: 0, eventName: "", eventDesc: "", eventDate: dayjs() },
  ]);
  const [focusedInput, setFocusedInput] = useState(null);
  const [focusedItem, setFocusedItem] = useState(null);

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
    "@media (min-width: 1024px)": {
      flexDirection: "column",
    },
  });

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
    setFocusedInput(focusedInput + 1);
    setFocusedItem("name");
  };

  const handleInputChange = (id, property, value) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, [property]: value } : event
      )
    );
  };

  return (
    <>
      <ResponsiveContainer>
        {events.map((event) => (
          <div key={event.id}>
            <Event
              id={event.id}
              eventName={event.eventName}
              eventDesc={event.eventDesc}
              eventDate={event.eventDate}
              onInputChange={handleInputChange}
              focusedInput={focusedInput}
              setFocusedInput={setFocusedInput}
              focusedItem={focusedItem}
              setFocusedItem={setFocusedItem}
            />
          </div>
        ))}
      </ResponsiveContainer>

      <Button onClick={handleAddComponent}>Add </Button>
    </>
  );
};

export default ICSGenerator;

import React, { useState } from "react";
import { styled } from "@mui/system";
import Event from "./Event";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
import { txtGenerator } from "../Utils/DateTimeUtil";

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

  const fileDownloader = () => {
    var icsData = txtGenerator(events);
    // Create a Blob object from the iCalendar data
    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });

    // Save the .ics file to the browser
    saveAs(blob, "holidays.ics");
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
      <br />
      <Button onClick={handleAddComponent}>Add </Button>

      <Button onClick={fileDownloader}>Save </Button>
    </>
  );
};

export default ICSGenerator;

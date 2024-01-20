import React, { useState } from "react";
import { styled } from "@mui/system";
import Event from "./Event";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
import { iCSTextGenerator } from "../Utils/DateTimeUtil";
import toast, { Toaster } from "react-hot-toast";

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
    console.log(focusedInput);
  };

  const handleRemoveClick = () => {
    if (events.length === 1) {
      toast.error("There's only one event exists");
    } else {
      const copyArr = [...events];
      copyArr.pop();
      setEvents(copyArr);

      setFocusedInput(focusedInput - 1);
      setFocusedItem("name");
    }
  };

  const handleInputChange = (id, property, value) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, [property]: value } : event
      )
    );
  };

  const handleSave = () => {
    let isEmpty = false;
    events.forEach((item) => {
      if (item.eventName === "") {
        isEmpty = true;
      }
    });

    if (!isEmpty) {
      var icsData = iCSTextGenerator(events);
      // Create a Blob object from the iCalendar data
      const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });

      // Save the .ics file to the browser
      saveAs(blob, "holidays.ics");
    } else {
      toast.error("Event name is required for all the events");
    }
  };

  const deleteAt = (itemId) => {
    const copyArray = events.filter((x) => x.id !== itemId); //[...events];

    copyArray.forEach((item, index) => {
      item.id = index;
    });

    //copyArray.splice(itemId, 1);
    console.log(copyArray);
    setEvents(copyArray);
  };

  return (
    <>
      <ResponsiveContainer>
        {events.map((event, index) => (
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
              deleteAt={deleteAt}
            />
          </div>
        ))}
      </ResponsiveContainer>
      <br />
      <Button onClick={handleAddComponent}>Add a day</Button>

      <Button onClick={handleRemoveClick}>Remove a day</Button>
      <Button onClick={handleSave}>Export </Button>
      <Button onClick={() => console.log(events)}>print</Button>
      <div>
        <Toaster />
      </div>
    </>
  );
};

export default ICSGenerator;

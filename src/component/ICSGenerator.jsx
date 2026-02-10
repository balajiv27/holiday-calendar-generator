import React, { useEffect, useState } from "react";
import Event from "./Event";
import HolidayTemplates from "./HolidayTemplates";
import ImportICS from "./ImportICS";
import { Button, Box } from "@mui/material";
import { saveAs } from "file-saver";
import { iCSTextGenerator } from "../Utils/DateTimeUtil";
import toast, { Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const ICSGenerator = () => {
  const [events, setEvents] = useState([
    { id: 0, eventName: "", eventDesc: "", eventDate: dayjs() },
  ]);
  const [focusedInput, setFocusedInput] = useState(null);
  const [focusedItem, setFocusedItem] = useState(null);

  const handleInputChange = (id, property, value) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, [property]: value } : event
      )
    );
  };

  const handleAddTemplate = (template) => {
    setEvents((prevEvents) => {
      if (prevEvents.length === 1 && prevEvents[0].eventName === "") {
        return [{ ...template, id: 0 }];
      }
      return [
        ...prevEvents,
        { ...template, id: prevEvents.length }
      ];
    });
    toast.success(`${template.eventName} added!`);
  };

  const handleImportEvents = (importedEvents) => {
    setEvents((prevEvents) => {
      let filteredPrev = prevEvents;
      if (prevEvents.length === 1 && prevEvents[0].eventName === "") {
        filteredPrev = [];
      }
      
      const combined = [...filteredPrev, ...importedEvents];
      return combined.map((item, index) => ({
        ...item,
        id: index
      }));
    });
  };

  const handleSave = () => {
    let isEmpty = false;
    events.forEach((item) => {
      if (item.eventName === "") {
        isEmpty = true;
      }
    });

    if (!isEmpty) {
      const icsData = iCSTextGenerator(events);
      const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
      saveAs(blob, "holidays.ics");
      toast.success("Calendar exported successfully!");
    } else {
      toast.error("Event name is required for all the events");
    }
  };

  const deleteAt = (itemId) => {
    if (events.length === 1) {
      toast.error("There's only one event exists");
      return;
    }
    const copyArray = events.filter((x) => x.id !== itemId);
    const updatedArray = copyArray.map((item, index) => ({
      ...item,
      id: index
    }));

    setEvents(updatedArray);
    toast.success("Event removed");
  };

  return (
    <>
      <div className="events-container">
        {events.map((event, index) => (
          <Event
            key={event.id}
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
            setEvents={setEvents}
            events={events}
          />
        ))}
      </div>
      
      <Box className="box" sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
        <ImportICS onImport={handleImportEvents} />
        <Button 
          variant="contained" 
          onClick={handleSave}
          startIcon={<FileDownloadIcon />}
          size="large"
          sx={{ minWidth: 200 }}
        >
          Export Calendar
        </Button>
      </Box>

      <HolidayTemplates onAddTemplate={handleAddTemplate} />

      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#1a1a2e',
            color: '#fff',
            border: '1px solid var(--border-color)',
            fontFamily: "'Inter', sans-serif",
          },
        }}
      />
    </>
  );
};

export default ICSGenerator;

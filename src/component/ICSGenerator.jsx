import React, { useState } from "react";
import Event from "./Event";
import HolidayTemplates from "./HolidayTemplates";
import ImportICS from "./ImportICS";
import { Button, Box } from "@mui/material";
import { saveAs } from "file-saver";
import { iCSTextGenerator } from "../Utils/DateTimeUtil";
import toast, { Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const newEvent = (id = 0) => ({
  id,
  eventName: "",
  eventDesc: "",
  eventDate: dayjs(),
  isFullDay: true,
  color: "",
});

const ICSGenerator = () => {
  const [events, setEvents] = useState([newEvent(0)]);
  const [focusedInput, setFocusedInput] = useState(null);
  const [focusedItem, setFocusedItem] = useState(null);

  const handleInputChange = (id, property, value) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === id ? { ...event, [property]: value } : event))
    );
  };

  const handleAddTemplate = (template) => {
    setEvents((prev) => {
      if (prev.length === 1 && prev[0].eventName === "") {
        return [{ ...template, id: 0 }];
      }
      return [...prev, { ...template, id: prev.length }];
    });
    toast.success(`${template.eventName} added!`);
  };

  const handleImportEvents = (importedEvents) => {
    setEvents((prev) => {
      const base = prev.length === 1 && prev[0].eventName === "" ? [] : prev;
      return [...base, ...importedEvents].map((item, i) => ({ ...item, id: i }));
    });
  };

  const handleSave = () => {
    if (events.some((e) => !e.eventName.trim())) {
      toast.error("Event name is required for all events");
      return;
    }
    const blob = new Blob([iCSTextGenerator(events)], { type: "text/calendar;charset=utf-8" });
    saveAs(blob, "holidays.ics");
    toast.success("Calendar exported successfully!");
  };

  const deleteAt = (itemId) => {
    if (events.length === 1) {
      toast.error("At least one event is required");
      return;
    }
    setEvents(
      events.filter((x) => x.id !== itemId).map((item, i) => ({ ...item, id: i }))
    );
    toast.success("Event removed");
  };

  return (
    <>
      <div className="events-container">
        {events.map((event) => (
          <Event
            key={event.id}
            {...event}
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

      <Box className="box">
        <ImportICS onImport={handleImportEvents} />
        <Button
          variant="contained"
          onClick={handleSave}
          startIcon={<FileDownloadIcon />}
          size="large"
        >
          Export Calendar
        </Button>
      </Box>

      <HolidayTemplates onAddTemplate={handleAddTemplate} />

      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#1a1a2e",
            color: "#fff",
            border: "1px solid var(--border-color)",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.875rem",
          },
        }}
      />
    </>
  );
};

export default ICSGenerator;

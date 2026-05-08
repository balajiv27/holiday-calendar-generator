import React, { useRef } from "react";
import { Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import dayjs from "dayjs";
import toast from "react-hot-toast";

const ImportICS = ({ onImport }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => parseICS(ev.target.result);
    reader.readAsText(file);
    e.target.value = "";
  };

  const parseICS = (content) => {
    try {
      const events = [];
      const blocks = content.split("BEGIN:VEVENT");
      blocks.shift();

      blocks.forEach((block) => {
        const event = { isFullDay: false, color: "", eventDesc: "" };
        block.split(/\r?\n/).forEach((line) => {
          if (line.startsWith("SUMMARY:")) {
            event.eventName = line.slice("SUMMARY:".length).trim();
          } else if (line.startsWith("DESCRIPTION:")) {
            event.eventDesc = line.slice("DESCRIPTION:".length).trim();
          } else if (line.startsWith("DTSTART;VALUE=DATE:")) {
            const d = line.slice("DTSTART;VALUE=DATE:".length).trim();
            event.eventDate = dayjs(`${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`);
            event.isFullDay = true;
          } else if (line.startsWith("DTSTART:")) {
            const d = line.slice("DTSTART:".length).trim();
            const hr = d.slice(9, 11) || "00";
            const mn = d.slice(11, 13) || "00";
            event.eventDate = dayjs(`${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)} ${hr}:${mn}`);
            event.isFullDay = false;
          } else if (line.startsWith("X-APPLE-CALENDAR-COLOR:")) {
            event.color = line.slice("X-APPLE-CALENDAR-COLOR:".length).trim();
          }
        });
        if (event.eventName && event.eventDate) events.push(event);
      });

      if (events.length > 0) {
        onImport(events);
        toast.success(`Imported ${events.length} event${events.length > 1 ? "s" : ""}!`);
      } else {
        toast.error("No valid events found in file");
      }
    } catch (err) {
      toast.error("Failed to parse ICS file");
      console.error(err);
    }
  };

  return (
    <>
      <input
        type="file"
        accept=".ics"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <Button
        variant="outlined"
        startIcon={<FileUploadIcon />}
        onClick={() => fileInputRef.current.click()}
        size="large"
      >
        Import ICS
      </Button>
    </>
  );
};

export default ImportICS;

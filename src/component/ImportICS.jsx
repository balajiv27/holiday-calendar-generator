import React, { useRef } from "react";
import { Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import dayjs from "dayjs";
import toast from "react-hot-toast";

const ImportICS = ({ onImport }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        parseICS(content);
      };
      reader.readAsText(file);
    }
  };

  const parseICS = (content) => {
    try {
      const events = [];
      const blocks = content.split("BEGIN:VEVENT");
      
      blocks.shift(); // Remove content before first VEVENT

      blocks.forEach((block) => {
        const event = {};
        const lines = block.split(/\r?\n/);
        
        lines.forEach((line) => {
          if (line.startsWith("SUMMARY:")) {
            event.eventName = line.replace("SUMMARY:", "").trim();
          } else if (line.startsWith("DESCRIPTION:")) {
            event.eventDesc = line.replace("DESCRIPTION:", "").trim();
          } else if (line.startsWith("DTSTART:")) {
            const dateStr = line.replace("DTSTART:", "").trim();
            // Basic format: YYYYMMDDTHHmmss
            const year = dateStr.substring(0, 4);
            const month = dateStr.substring(4, 6);
            const day = dateStr.substring(6, 8);
            const hour = dateStr.substring(9, 11) || "00";
            const min = dateStr.substring(11, 13) || "00";
            event.eventDate = dayjs(`${year}-${month}-${day} ${hour}:${min}`);
          }
        });

        if (event.eventName && event.eventDate) {
          events.push(event);
        }
      });

      if (events.length > 0) {
        onImport(events);
        toast.success(`Imported ${events.length} events!`);
      } else {
        toast.error("No valid events found in file");
      }
    } catch (error) {
      toast.error("Failed to parse ICS file");
      console.error(error);
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

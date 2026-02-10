import React from "react";
import { Button, Box, Typography, Chip } from "@mui/material";
import dayjs from "dayjs";

const POPULAR_HOLIDAYS = [
  { name: "New Year's Day", date: "01-01", desc: "Start of the new year" },
  { name: "Valentine's Day", date: "02-14", desc: "Celebration of love" },
  { name: "Independence Day", date: "07-04", desc: "National holiday" },
  { name: "Halloween", date: "10-31", desc: "Spooky celebrations" },
  { name: "Christmas", date: "12-25", desc: "Holiday season" },
];

const HolidayTemplates = ({ onAddTemplate }) => {
  const currentYear = dayjs().year();

  const handleAdd = (holiday) => {
    const holidayDate = dayjs(`${currentYear}-${holiday.date}`);
    onAddTemplate({
      eventName: holiday.name,
      eventDesc: holiday.desc,
      eventDate: holidayDate,
    });
  };

  return (
    <Box sx={{ mt: 4, textAlign: "center", animation: "fadeIn 1s ease 0.6s backwards" }}>
      <Typography variant="h6" sx={{ color: "var(--text-secondary)", mb: 2, fontWeight: 500 }}>
        Quick Add Templates
      </Typography>
      <Box sx={{ display: "flex", gap: 1, justifyContent: "center", flexWrap: "wrap" }}>
        {POPULAR_HOLIDAYS.map((holiday) => (
          <Chip
            key={holiday.name}
            label={holiday.name}
            onClick={() => handleAdd(holiday)}
            sx={{
              background: "rgba(102, 126, 234, 0.1)",
              color: "var(--primary-light)",
              border: "1px solid rgba(102, 126, 234, 0.3)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                background: "var(--primary-gradient)",
                color: "white",
                transform: "translateY(-2px)",
                boxShadow: "var(--shadow-glow)",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default HolidayTemplates;

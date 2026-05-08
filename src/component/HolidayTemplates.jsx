import React, { useState } from "react";
import { Box, Typography, Chip, Select, MenuItem, FormControl } from "@mui/material";
import dayjs from "dayjs";

// Returns the nth occurrence of a weekday (0=Sun..6=Sat) in a month.
// Pass n=-1 for the last occurrence.
function getNthWeekday(year, month, weekday, n) {
  if (n > 0) {
    let d = dayjs(`${year}-${String(month).padStart(2, "0")}-01`);
    while (d.day() !== weekday) d = d.add(1, "day");
    return d.add((n - 1) * 7, "day");
  }
  let d = dayjs(`${year}-${String(month).padStart(2, "0")}-01`).endOf("month");
  while (d.day() !== weekday) d = d.subtract(1, "day");
  return d;
}

// Gregorian anonymous Easter algorithm
function getEaster(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return dayjs(`${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`);
}

// Victoria Day: Monday on or before May 25
function getVictoriaDay(year) {
  let d = dayjs(`${year}-05-25`);
  while (d.day() !== 1) d = d.subtract(1, "day");
  return d;
}

const fixed = (year, mm, dd, name, desc) => ({
  name,
  desc,
  date: dayjs(`${year}-${mm}-${dd}`),
});

const COUNTRY_TEMPLATES = {
  US: {
    label: "🇺🇸 United States",
    getHolidays: (year) => [
      fixed(year, "01", "01", "New Year's Day", "New Year's Day"),
      { name: "MLK Jr. Day", desc: "Martin Luther King Jr. Day", date: getNthWeekday(year, 1, 1, 3) },
      { name: "Presidents' Day", desc: "Presidents' Day", date: getNthWeekday(year, 2, 1, 3) },
      { name: "Memorial Day", desc: "Memorial Day", date: getNthWeekday(year, 5, 1, -1) },
      fixed(year, "06", "19", "Juneteenth", "Juneteenth National Independence Day"),
      fixed(year, "07", "04", "Independence Day", "Independence Day"),
      { name: "Labor Day", desc: "Labor Day", date: getNthWeekday(year, 9, 1, 1) },
      fixed(year, "11", "11", "Veterans Day", "Veterans Day"),
      { name: "Thanksgiving", desc: "Thanksgiving Day", date: getNthWeekday(year, 11, 4, 4) },
      fixed(year, "12", "25", "Christmas", "Christmas Day"),
    ],
  },
  UK: {
    label: "🇬🇧 United Kingdom",
    getHolidays: (year) => {
      const easter = getEaster(year);
      return [
        fixed(year, "01", "01", "New Year's Day", "New Year's Day"),
        { name: "Good Friday", desc: "Good Friday", date: easter.subtract(2, "day") },
        { name: "Easter Monday", desc: "Easter Monday", date: easter.add(1, "day") },
        { name: "May Bank Holiday", desc: "Early May Bank Holiday", date: getNthWeekday(year, 5, 1, 1) },
        { name: "Spring Bank Holiday", desc: "Spring Bank Holiday", date: getNthWeekday(year, 5, 1, -1) },
        { name: "Summer Bank Holiday", desc: "Summer Bank Holiday", date: getNthWeekday(year, 8, 1, -1) },
        fixed(year, "12", "25", "Christmas", "Christmas Day"),
        fixed(year, "12", "26", "Boxing Day", "Boxing Day"),
      ];
    },
  },
  IN: {
    label: "🇮🇳 India",
    getHolidays: (year) => [
      fixed(year, "01", "26", "Republic Day", "Republic Day of India"),
      fixed(year, "03", "14", "Holi", "Festival of Colors (approximate)"),
      fixed(year, "08", "15", "Independence Day", "Indian Independence Day"),
      fixed(year, "10", "02", "Gandhi Jayanti", "Gandhi Jayanti"),
      fixed(year, "10", "20", "Diwali", "Festival of Lights (approximate)"),
      fixed(year, "11", "15", "Guru Nanak Jayanti", "Guru Nanak Jayanti (approximate)"),
      fixed(year, "12", "25", "Christmas", "Christmas Day"),
    ],
  },
  CA: {
    label: "🇨🇦 Canada",
    getHolidays: (year) => {
      const easter = getEaster(year);
      return [
        fixed(year, "01", "01", "New Year's Day", "New Year's Day"),
        { name: "Good Friday", desc: "Good Friday", date: easter.subtract(2, "day") },
        { name: "Victoria Day", desc: "Victoria Day", date: getVictoriaDay(year) },
        fixed(year, "07", "01", "Canada Day", "Canada Day"),
        { name: "Labour Day", desc: "Labour Day", date: getNthWeekday(year, 9, 1, 1) },
        { name: "Thanksgiving", desc: "Thanksgiving Day", date: getNthWeekday(year, 10, 1, 2) },
        fixed(year, "11", "11", "Remembrance Day", "Remembrance Day"),
        fixed(year, "12", "25", "Christmas", "Christmas Day"),
      ];
    },
  },
  DE: {
    label: "🇩🇪 Germany",
    getHolidays: (year) => {
      const easter = getEaster(year);
      return [
        fixed(year, "01", "01", "New Year's Day", "Neujahr"),
        { name: "Good Friday", desc: "Karfreitag", date: easter.subtract(2, "day") },
        { name: "Easter Monday", desc: "Ostermontag", date: easter.add(1, "day") },
        fixed(year, "05", "01", "Labour Day", "Tag der Arbeit"),
        { name: "Ascension Day", desc: "Christi Himmelfahrt", date: easter.add(39, "day") },
        { name: "Whit Monday", desc: "Pfingstmontag", date: easter.add(50, "day") },
        fixed(year, "10", "03", "German Unity Day", "Tag der Deutschen Einheit"),
        fixed(year, "12", "25", "Christmas Day", "1. Weihnachtstag"),
        fixed(year, "12", "26", "Boxing Day", "2. Weihnachtstag"),
      ];
    },
  },
  FR: {
    label: "🇫🇷 France",
    getHolidays: (year) => {
      const easter = getEaster(year);
      return [
        fixed(year, "01", "01", "New Year's Day", "Jour de l'An"),
        { name: "Easter Monday", desc: "Lundi de Pâques", date: easter.add(1, "day") },
        fixed(year, "05", "01", "Labour Day", "Fête du Travail"),
        fixed(year, "05", "08", "Victory Day", "Fête de la Victoire 1945"),
        { name: "Ascension", desc: "Ascension", date: easter.add(39, "day") },
        fixed(year, "07", "14", "Bastille Day", "Fête Nationale"),
        fixed(year, "08", "15", "Assumption", "Assomption de Marie"),
        fixed(year, "11", "01", "All Saints Day", "Toussaint"),
        fixed(year, "11", "11", "Armistice Day", "Armistice 1918"),
        fixed(year, "12", "25", "Christmas", "Noël"),
      ];
    },
  },
};

const HolidayTemplates = ({ onAddTemplate }) => {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const year = dayjs().year();
  const holidays = COUNTRY_TEMPLATES[selectedCountry].getHolidays(year);

  const handleAdd = (holiday) => {
    onAddTemplate({
      eventName: holiday.name,
      eventDesc: holiday.desc,
      eventDate: holiday.date,
      isFullDay: true,
      color: "",
    });
  };

  return (
    <Box sx={{ mt: 2, animation: "fadeIn 1s ease 0.6s backwards" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mb: 1.5 }}>
        <Typography
          variant="subtitle2"
          sx={{ color: "var(--text-secondary)", fontWeight: 500, whiteSpace: "nowrap" }}
        >
          Quick Add Holidays
        </Typography>
        <FormControl size="small" sx={{ minWidth: 190 }}>
          <Select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            sx={{
              color: "var(--text-primary)",
              fontSize: "0.85rem",
              ".MuiOutlinedInput-notchedOutline": { borderColor: "var(--border-color)" },
              ".MuiSvgIcon-root": { color: "var(--text-secondary)" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(102,126,234,0.5)" },
            }}
          >
            {Object.entries(COUNTRY_TEMPLATES).map(([code, info]) => (
              <MenuItem key={code} value={code} sx={{ fontSize: "0.9rem" }}>
                {info.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: "flex", gap: 0.75, justifyContent: "center", flexWrap: "wrap" }}>
        {holidays.map((holiday) => (
          <Chip
            key={holiday.name}
            label={`${holiday.name} · ${holiday.date.format("MMM D")}`}
            onClick={() => handleAdd(holiday)}
            size="small"
            sx={{
              background: "rgba(102,126,234,0.1)",
              color: "var(--primary-light)",
              border: "1px solid rgba(102,126,234,0.25)",
              fontSize: "0.75rem",
              transition: "all 0.2s ease",
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

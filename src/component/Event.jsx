import React, { useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Switch, FormControlLabel, Tooltip, Box } from "@mui/material";

const EVENT_COLORS = [
  { label: "None", hex: "" },
  { label: "Red", hex: "#FF3B30" },
  { label: "Orange", hex: "#FF9500" },
  { label: "Yellow", hex: "#FFCC00" },
  { label: "Green", hex: "#34C759" },
  { label: "Blue", hex: "#007AFF" },
  { label: "Purple", hex: "#AF52DE" },
  { label: "Pink", hex: "#FF2D55" },
];

const Event = ({
  id,
  eventName,
  eventDesc,
  eventDate,
  isFullDay,
  color,
  onInputChange,
  focusedInput,
  setFocusedInput,
  focusedItem,
  setFocusedItem,
  deleteAt,
  setEvents,
  events,
}) => {
  const inputEventRef = useRef(null);
  const inputEventDescRef = useRef(null);

  useEffect(() => {
    if (inputEventRef.current && focusedInput === id && focusedItem === "name") {
      inputEventRef.current.focus();
    } else if (inputEventDescRef.current && focusedInput === id && focusedItem === "desc") {
      inputEventDescRef.current.focus();
    }
  }, [focusedInput, focusedItem, id]);

  const handleItemChange = (property, value) => onInputChange(id, property, value);

  const handleAddComponent = () => {
    setEvents((prev) => [
      ...prev,
      { id: prev.length, eventName: "", eventDesc: "", eventDate: dayjs(), isFullDay: true, color: "" },
    ]);
    setFocusedInput(id + 1);
    setFocusedItem("name");
  };

  return (
    <div className="event-card" style={{ animationDelay: `${id * 0.08}s` }}>
      {/* Row 1: Name + Description */}
      <Box sx={{ display: "flex", gap: 1.5, mb: 1.5, flexWrap: "wrap" }}>
        <TextField
          inputRef={inputEventRef}
          label="Event Name"
          variant="outlined"
          size="small"
          value={eventName}
          onChange={(e) => handleItemChange("eventName", e.target.value)}
          onFocus={() => { setFocusedInput(id); setFocusedItem("name"); }}
          required
          sx={{ flex: "1 1 150px" }}
        />
        <TextField
          inputRef={inputEventDescRef}
          label="Description"
          variant="outlined"
          size="small"
          value={eventDesc}
          onChange={(e) => handleItemChange("eventDesc", e.target.value)}
          onFocus={() => { setFocusedInput(id); setFocusedItem("desc"); }}
          sx={{ flex: "2 1 200px" }}
        />
      </Box>

      {/* Row 2: Date + Controls */}
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", flexWrap: "wrap" }}>
        {isFullDay ? (
          <DatePicker
            label="Event Date"
            value={eventDate}
            onChange={(date) => handleItemChange("eventDate", date)}
            slotProps={{
              textField: { variant: "outlined", size: "small", sx: { flex: "1 1 150px" } },
            }}
          />
        ) : (
          <DateTimePicker
            label="Event Date & Time"
            value={eventDate}
            onChange={(date) => handleItemChange("eventDate", date)}
            slotProps={{
              textField: { variant: "outlined", size: "small", sx: { flex: "1 1 200px" } },
            }}
          />
        )}

        <FormControlLabel
          control={
            <Switch
              checked={isFullDay}
              onChange={(e) => handleItemChange("isFullDay", e.target.checked)}
              size="small"
            />
          }
          label="All day"
          sx={{ m: 0, color: "var(--text-secondary)", "& .MuiFormControlLabel-label": { fontSize: "0.8rem" } }}
        />

        {/* Color palette */}
        <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
          {EVENT_COLORS.map((c) => (
            <Tooltip key={c.label} title={c.label} arrow>
              <Box
                onClick={() => handleItemChange("color", c.hex)}
                sx={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: c.hex || "rgba(255,255,255,0.08)",
                  border: color === c.hex
                    ? "2.5px solid #fff"
                    : "2px solid rgba(255,255,255,0.2)",
                  cursor: "pointer",
                  transition: "transform 0.15s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.5)",
                  flexShrink: 0,
                  "&:hover": { transform: "scale(1.3)" },
                }}
              >
                {c.hex === "" && "×"}
              </Box>
            </Tooltip>
          ))}
        </Box>

        {/* Action buttons */}
        <Box sx={{ display: "flex", gap: 0.5, ml: "auto" }}>
          {events.length === id + 1 && (
            <IconButton
              className="add-icon"
              size="small"
              onClick={handleAddComponent}
              title="Add event"
            >
              <AddBoxIcon fontSize="small" />
            </IconButton>
          )}
          <IconButton
            className="delete-icon"
            size="small"
            onClick={() => deleteAt(id)}
            title="Delete event"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </div>
  );
};

export default Event;

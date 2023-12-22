import React from 'react';
import { saveAs } from 'file-saver';

const CalendarEvent = () => {
  const handleDownloadClick = () => {
    // Create a string representing the iCalendar file
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Your Company//EN
BEGIN:VEVENT
UID:1
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '')}Z
DTSTART:20230905T100000
DTEND:20230905T110000
SUMMARY:Sample Event
DESCRIPTION:This is a sample event description
END:VEVENT
END:VCALENDAR`;

    // Create a Blob object from the iCalendar data
    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });

    // Save the .ics file to the browser
    saveAs(blob, 'sample-event.ics');
  };

  return (
    <div>
      <h2>Calendar Event</h2>
      <button onClick={handleDownloadClick}>Download .ics</button>
    </div>
  );
};

export default CalendarEvent;

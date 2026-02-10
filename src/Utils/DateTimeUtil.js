import dayjs from "dayjs";

export function iCSTextGenerator(events) {
  let icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Antigravity//Holiday Calendar Generator//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH"
  ];

  events.forEach((item) => {
    // Check if eventDate is a dayjs object or just a date string
    const dateObj = dayjs(item.eventDate);
    const start = dateObj.format("YYYYMMDDTHHmmss");
    // Default to 1 hour duration
    const end = dateObj.add(1, 'hour').format("YYYYMMDDTHHmmss");
    const stamp = dayjs().format("YYYYMMDDTHHmmssZ");
    const uid = `uid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}@generator.com`;

    icsLines.push("BEGIN:VEVENT");
    icsLines.push(`UID:${uid}`);
    icsLines.push(`DTSTAMP:${stamp}`);
    icsLines.push(`DTSTART:${start}`);
    icsLines.push(`DTEND:${end}`);
    icsLines.push(`SUMMARY:${item.eventName}`);
    if (item.eventDesc) {
      icsLines.push(`DESCRIPTION:${item.eventDesc}`);
    }
    icsLines.push("END:VEVENT");
  });

  icsLines.push("END:VCALENDAR");

  return icsLines.join("\r\n");
}

export default iCSTextGenerator;

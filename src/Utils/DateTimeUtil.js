import dayjs from "dayjs";

export function iCSTextGenerator(events) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Holiday Calendar Generator//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];

  events.forEach((item) => {
    const date = dayjs(item.eventDate);
    const uid = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}@hcg.app`;
    const stamp = dayjs().format("YYYYMMDDTHHmmss") + "Z";

    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${uid}`);
    lines.push(`DTSTAMP:${stamp}`);

    if (item.isFullDay) {
      lines.push(`DTSTART;VALUE=DATE:${date.format("YYYYMMDD")}`);
      lines.push(`DTEND;VALUE=DATE:${date.add(1, "day").format("YYYYMMDD")}`);
    } else {
      lines.push(`DTSTART:${date.format("YYYYMMDDTHHmmss")}`);
      lines.push(`DTEND:${date.add(1, "hour").format("YYYYMMDDTHHmmss")}`);
    }

    lines.push(`SUMMARY:${item.eventName}`);
    if (item.eventDesc) lines.push(`DESCRIPTION:${item.eventDesc}`);
    if (item.color) lines.push(`X-APPLE-CALENDAR-COLOR:${item.color}`);

    lines.push("END:VEVENT");
  });

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export default iCSTextGenerator;

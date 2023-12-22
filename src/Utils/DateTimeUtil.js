import dayjs from "dayjs";

let st = "";

const stGen = (item) => {
  console.log(item.eventDate);

  st +=
    "\nBEGIN:VEVENT\nDTSTART:" +
    dayjs(item.eventDate.$d).format("YYYYMMDD") +
    "T000000\nDTEND:" +
    dayjs(item.eventDate.$d).format("YYYYMMDD") +
    "T000000\nSUMMARY:" +
    item.eventName +
    "\nDESCRIPTION:" +
    item.eventDesc +
    "\nEND:VEVENT";
};

export function txtGenerator(events) {
  st = "";
  st =
    "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Your Company//Your Calendar App//EN\nCALSCALE:GREGORIAN";
  events.forEach(stGen);
  st += "\nEND:VCALENDAR";

  return st;
}

export default txtGenerator;

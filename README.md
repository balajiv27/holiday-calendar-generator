# Holiday Calendar Generator

**Live demo:** [balajiv27.github.io/holiday-calendar-generator](https://balajiv27.github.io/holiday-calendar-generator)

A React web app to create, manage, and export calendar events as `.ics` files — compatible with Google Calendar, Apple Calendar, and Outlook.

## Features

- **Create events** with name, description, and date
- **All-day or timed events** — toggle per event; all-day events use the correct `DTSTART;VALUE=DATE` ICS format
- **Event colors** — assign one of 8 colors per event (rendered in Apple Calendar via `X-APPLE-CALENDAR-COLOR`)
- **6-country holiday templates** — quick-add buttons for US, UK, India, Canada, Germany, and France; moveable feasts (Easter, Thanksgiving, etc.) are computed accurately for the current year
- **Import existing ICS files** — parses events including all-day flag and Apple color metadata
- **Export to ICS** — downloads a standards-compliant `holidays.ics` file

## How to Use

### Creating Events

1. Enter an **Event Name** (required) and optional **Description**
2. Pick a date with the date picker
3. Toggle **All day** on for holidays/anniversaries, or off for timed meetings
4. Click a color swatch to assign a color (visible in Apple Calendar)
5. Click **+** to add another event row

### Using Holiday Templates

1. In the **Quick Add Holidays** section, pick a country from the dropdown
2. Click any chip (e.g. `Christmas · Dec 25`) to instantly add that holiday
3. Templates default to all-day and use the current year's correct dates
4. Moveable holidays (Easter, Good Friday, Thanksgiving, etc.) are calculated automatically

**Supported countries:** 🇺🇸 United States · 🇬🇧 United Kingdom · 🇮🇳 India · 🇨🇦 Canada · 🇩🇪 Germany · 🇫🇷 France

### Importing an Existing ICS File

1. Click **Import ICS** and select an `.ics` file
2. Events are parsed and added to the list for editing
3. All-day events and Apple Calendar color tags are preserved on round-trip

### Exporting

1. Click **Export Calendar** to download `holidays.ics`
2. Import into your calendar app:
   - **Google Calendar:** Settings → Import → upload the file
   - **Apple Calendar:** File → Import
   - **Outlook:** File → Open & Export → Import/Export

## ICS Color Support

| Calendar App | Color Support |
|---|---|
| Apple Calendar | ✅ Full (via `X-APPLE-CALENDAR-COLOR`) |
| Google Calendar | ❌ Ignores event-level color in ICS |
| Outlook | ❌ Not supported |

## Local Development

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
npm run build   # production build
npm test        # run tests
```

## Tech Stack

| Package | Purpose |
|---|---|
| React 18 | UI framework |
| Material UI v5 | Component library |
| @mui/x-date-pickers v6 | DatePicker / DateTimePicker |
| dayjs | Date parsing and formatting |
| file-saver | ICS file download |
| react-hot-toast | Toast notifications |

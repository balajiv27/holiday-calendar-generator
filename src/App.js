import "./App.css";
import ICSGenerator from "./component/ICSGenerator";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <header className="App-header">
          <div className="header-content">
            <h1>Holiday Calendar Generator</h1>
            <p>Create and export custom calendar events in ICS format</p>
          </div>
          <ICSGenerator />
        </header>
      </div>
    </LocalizationProvider>
  );
}

export default App;

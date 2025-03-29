import logo from "./logo.svg";
import "./App.css";
import ICSGenerator from "./component/ICSGenerator";
import { red } from "@mui/material/colors";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3 style={styles.heading}>Calender Event Generator</h3>
        <ICSGenerator></ICSGenerator>
      </header>
    </div>
  );
}

const styles = {
  heading: {
    fontFamily: "Arial, sans-serif",
    fontSize: "1.5em",
    letterSpacing: "1px",
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
};

export default App;

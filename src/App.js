import logo from "./logo.svg";
import "./App.css";
import ICSGenerator from "./component/ICSGenerator";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ICSGenerator></ICSGenerator>
      </header>
    </div>
  );
}

export default App;

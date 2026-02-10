import "./App.css";
import ICSGenerator from "./component/ICSGenerator";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>Holiday Calendar Generator</h1>
          <p>Create and export custom calendar events with ease</p>
        </div>
        <ICSGenerator />
      </header>
    </div>
  );
}

export default App;

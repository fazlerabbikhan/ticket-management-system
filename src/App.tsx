import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Menu } from "./components/Menu";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Ticket Management System</h1>
      </header>
      <Menu></Menu>
    </div>
  );
}

export default App;

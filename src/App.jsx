import { useState } from "react";
import Login from "./components/login";
import { BrowserRouter } from "react-router-dom";
import Allroutes from "./routes/Routes";
import Navigation from "./components/navigation";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Allroutes />
    </BrowserRouter>
  );
}

export default App;

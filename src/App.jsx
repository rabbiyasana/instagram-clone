import { useState } from "react";
import Login from "./components/login";
import { BrowserRouter } from "react-router-dom";
import Allroutes from "./routes/Routes";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Allroutes />
      </BrowserRouter>
      {/* <Login /> */}
    </>
  );
}

export default App;

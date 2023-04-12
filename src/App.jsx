import { AuthProvider } from "./context/authContetxt";
import { BrowserRouter } from "react-router-dom";
import Allroutes from "./routes/Routes";
import "./App.css";

let logged = localStorage.getItem("loggedIn");
// console.log(logged);
function App() {
  return (
    <BrowserRouter>
      <AuthProvider logged={logged}>
        <Allroutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

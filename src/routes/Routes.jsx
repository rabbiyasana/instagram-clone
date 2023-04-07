import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import SignUP from "../components/SignUP";
import Login from "../components/login";
export default function () {
  return (
    <>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<SignUP />} />
      </Routes>
    </>
  );
}

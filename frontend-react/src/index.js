import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./pages/login/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Backoffice from "./pages/backoffice/backoffice";
import Home from "./pages/home/home";
import Patient from "./pages/patient/patient";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="backoffice" element={<Backoffice />} />
        <Route path="home" element={<Home />} />
        {/* <Route exact path="patient/:id" element={<Patient />} /> */}
        <Route exact path="patient/:id" element={<Patient />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

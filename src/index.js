import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Routes from "./routes";
import "./helpers/pomodoroFonts/css/index.css";

ReactDOM.render(
  <React.StrictMode>
    <Routes />
    <ToastContainer limit={1} />
  </React.StrictMode>,
  document.getElementById("root")
);

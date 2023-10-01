import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QuizProvider } from "./context/quiz.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <QuizProvider>
      <App />
    </QuizProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

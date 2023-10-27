import React from "react";
import "./App.css";
import "./assets/font/responsive.scss";
import { RouterProvider } from "react-router-dom";
import router from "src/routers";

function App() {
  return <RouterProvider router={router} />;
}

export default App;

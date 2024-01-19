import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Teacherpage from "./Teacherpage";
import Eachstd from "./Eachstd";
import Hometc from "./Hometc";
import Announcedetail from "./components/Announcedetail";

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path: "home",
    element: <Eachstd/>
  },
  {
    path:"admin",
    element:<Hometc/>
  },
  {
    path: `announce/:id`, // ใช้ :id เป็น dynamic segment
    element: <Announcedetail />
  }

])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <RouterProvider router={router} />

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

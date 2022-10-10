import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Strapi from "./Pages/strapi";
import DragnDrop from "./Pages/dragndrop";
import TouchEvent from "./Pages/touchevents";
import AntdMenuHorizontal from "Pages/AntdMenuHorizontal";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={`*`} element={<Home />} />
          <Route path={`/strapi`} element={<Strapi />} />
          <Route path={`/dnd`} element={<DragnDrop />} />
          <Route path={`/touch_event`} element={<TouchEvent />} />
          <Route path={`/antd_menu_horizontal`} element={<AntdMenuHorizontal />} />
        </Routes>{" "}
      </Router>
    </div>
  );
}

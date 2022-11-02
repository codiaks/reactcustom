import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Strapi from "./Pages/strapi";
import DragnDrop from "./Pages/dragndrop";
import TouchEvent from "./Pages/touchevents";
import AntdMenuHorizontal from "Pages/AntdMenuHorizontal";
import CsvDownload from "Pages/CSV download";
import CreatePdf from "Pages/CreatePdf";

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
          <Route path={`/csv_download`} element={<CsvDownload />} />
          <Route path={`/pdfme`} element={<CreatePdf />} />
        </Routes>{" "}
      </Router>
    </div>
  );
}

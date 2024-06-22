import React from "react";
import { createRoot } from "react-dom/client";
import Layout from "./components/Layout/Layout";
import { HashRouter } from "react-router-dom";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <HashRouter>
    <Layout />
  </HashRouter>
);

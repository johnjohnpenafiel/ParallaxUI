import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { injectSpeedInsights } from "@vercel/speed-insights";

import App from "./App.jsx";
import Preview from "./Preview";

injectSpeedInsights();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/embed/:id" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

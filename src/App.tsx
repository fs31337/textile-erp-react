import React from "react";
import "./App.css";
import { SideNav } from "./components/SIdeNav";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Settings } from "./pages/Settings";
import { Suppliers } from "./pages/Suppliers";
function App() {
  return (
    <>
      <BrowserRouter>
        <SideNav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/proveedores" element={<Suppliers />} />
          </Routes>
        </SideNav>
      </BrowserRouter>
    </>
  );
}

export default App;

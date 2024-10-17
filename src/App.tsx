import React from "react";
import "./App.css";
import { SideNav } from "./components/SIdeNav";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Settings } from "./pages/Settings";
import { Suppliers } from "./pages/Suppliers";
import { SupplierFormPage } from "./pages/SupplierFormPage";
import { NotificationProvider } from "./context/NotificationProvider";
function App() {
  return (
    <>
      <NotificationProvider>
        <BrowserRouter>
          <SideNav>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/proveedores" element={<Suppliers />} />
              <Route
                path="/proveedores/new"
                element={<SupplierFormPage mode="create" />}
              />
              <Route
                path="/proveedores/edit/:id"
                element={<SupplierFormPage mode="edit" />}
              />
              <Route
                path="/proveedores/:id"
                element={<SupplierFormPage mode="view" />}
              />
            </Routes>
          </SideNav>
        </BrowserRouter>
      </NotificationProvider>
    </>
  );
}

export default App;

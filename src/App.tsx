import React from "react";
import "./App.css";
import { SideNav } from "./components/SIdeNav";
import { Routes, BrowserRouter } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationProvider";
import RoutesWrapper from "./routes/RoutesWrapper";
function App() {
  return (
    <>
      <NotificationProvider>
        <BrowserRouter>
          <SideNav>
            <Routes>
              <RoutesWrapper />
            </Routes>
          </SideNav>
        </BrowserRouter>
      </NotificationProvider>
    </>
  );
}

export default App;

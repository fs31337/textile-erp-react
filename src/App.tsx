import React from "react";
import "./App.css";
import { SideNav } from "./components/SIdeNav";
import { BrowserRouter } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationProvider";
import { RoutesWrapper } from "./routes/RoutesWrapper";
function App() {
  return (
    <>
      <NotificationProvider>
        <BrowserRouter>
          <SideNav>
            <RoutesWrapper />
          </SideNav>
        </BrowserRouter>
      </NotificationProvider>
    </>
  );
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import { appRoutes } from "./AppRoutes";

export const RoutesWrapper = () => (
  <Routes>
    {appRoutes.map((route, index) => (
      <Route key={index} path={route.path} element={route.element} />
    ))}
  </Routes>
);

import React from "react";
import AppNva from "../AppNva/AppNva";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <AppNva />
      <Outlet />
    </>
  );
}

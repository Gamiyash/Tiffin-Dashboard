import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import AddTiffin from "./pages/Add-Tiffin"
import ManageTiffinSeeting from "./pages/ManageTiffinSeeting";
import DashboardHome from "./pages/DashboardHome";
import Orders from "./pages/Orders";


export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>

        <Route path="/" element={<DashboardHome />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/tiffin" element={<AddTiffin />} />
        <Route path="/outlet-info" element={<ManageTiffinSeeting />} />


      </Route>
    </Routes>
  );
}

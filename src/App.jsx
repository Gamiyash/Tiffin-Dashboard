import React from "react";
import { Routes, Route } from "react-router-dom"; 
import  DashboardLayout from "./layouts/DashboardLayout";
import AddTiffin from "./pages/Add-Tiffin"
import ManageTiffinSeeting from "./pages/ManageTiffinSeeting";


export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>

        <Route path="/" element={<AddTiffin />} />
        <Route path="/Tiffin-settings" element={<ManageTiffinSeeting />} />
        
      </Route>
    </Routes>
  );
}

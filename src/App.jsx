// ------------------------
// src/App.jsx
// ------------------------
import React from "react";
import { Routes, Route } from "react-router-dom"; 
import  DashboardLayout from "./layouts/DashboardLayout";
import AddTiffin from "./pages/Add-Tiffin"


export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>

        <Route path="/" element={<AddTiffin />} />
        {/* If you need more pages, add them here */}
      </Route>
    </Routes>
  );
}

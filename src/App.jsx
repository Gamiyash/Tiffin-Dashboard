import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom"; 
import  DashboardLayout from "./layouts/DashboardLayout";
import AddTiffin from "./pages/Add-Tiffin"
import ManageTiffinSeeting from "./pages/ManageTiffinSeeting";


export default function App() {
  // const location = useLocation();
  // const navigate = useNavigate();

  // // Save the current path to localStorage on path change
  // useEffect(() => {
  //   localStorage.setItem("currentPath", location.pathname);
  // }, [location]);

  // // On app load, navigate to the stored path
  // useEffect(() => {
  //   const storedPath = localStorage.getItem("currentPath");
  //   if (storedPath && storedPath !== location.pathname) {
  //     navigate(storedPath);
  //   }
  // }, [navigate, location]);
  return (
    <Routes>
      <Route element={<DashboardLayout />}>

        <Route path="/" element={<AddTiffin />} />
        <Route path="/Tiffin-settings" element={<ManageTiffinSeeting />} />
        
      </Route>
    </Routes>
  );
}

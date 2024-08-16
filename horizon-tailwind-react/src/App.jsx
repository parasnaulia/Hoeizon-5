import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { useSelector } from "react-redux";
import Login from "layouts/auth/Login";
const App = () => {
 const data= useSelector((state)=>{
    return state.togData
  })
  return (
    <Routes>
    

      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="authLogin/:id" element={<Login />} />
      
      
      <Route path="admin/*" element={<AdminLayout />} />
      

      <Route path="rtl/*" element={<RtlLayout />} />
      <Route path="/" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default App;

import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Announcepage from "./Announcepage";
import Navtc from "./components/Navtc";


function Hometc() {
  const handleLogout = () => {
    // ล้างค่าทั้งหมดที่เกี่ยวข้องกับการล็อกอิน
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('stdID');  // ถ้ามีค่าที่เกี่ยวข้องกับการล็อกอิน
    delete axios.defaults.headers.common['Authorization'];
    // ทำการ redirect ไปยังหน้าที่ต้องการ
    window.location.href = '/';
  };

  return (
    <div> 
      <Navtc onLogout={handleLogout}/>
      <h1>Home for teacher</h1>
      <Announcepage /> 
    </div>
  );
}
export default Hometc;

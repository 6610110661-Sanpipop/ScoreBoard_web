import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Announcepage from "./Announcepage";
import Navtc from "./components/Navtc";
import './decoration/Navtc.css'

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";
const URL_ANNOUNCE = "/api/announces";

function Hometc() {
  const [forceRefresh, setForceRefresh] = useState(false);

  const handleLogout = () => {
    // ล้างค่าทั้งหมดที่เกี่ยวข้องกับการล็อกอิน
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('stdID');  // ถ้ามีค่าที่เกี่ยวข้องกับการล็อกอิน
    delete axios.defaults.headers.common['Authorization'];
    // ทำการ redirect ไปยังหน้าที่ต้องการ
    window.location.href = '/';
  };

  const handleDelete = (id) =>{
    axios.delete(`${URL_ANNOUNCE}/${id}`);
    setForceRefresh(prev => !prev);
  }

  return (
    <div> 
      <Navtc onLogout={handleLogout}/>
      <h1>Home for teacher</h1>
      <Announcepage key={forceRefresh} onDelete={handleDelete} /> 
    </div>
  );
}
export default Hometc;

import React from "react";
import "./Announcepage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Navstd from "./components/Navstd";
import AnpageforStd from "./AnpageforStd";
import { Spin, Button, Modal, Form, Input } from "antd";
import { Link } from "react-router-dom";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";
const URL_ANNOUNCE = "/api/announces";
const URL_SCORE = "/api/scores"

function Homestd(props) {
    const [forceRefresh, setForceRefresh] = useState(false);
    const [searchtxt,setSearchtxt] = useState('')
    const stdID = localStorage.getItem('stdID')

    const handleLogout = () => {
        // ล้างค่าทั้งหมดที่เกี่ยวข้องกับการล็อกอิน
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('role');
        localStorage.removeItem('IDuser');
        localStorage.removeItem('stdID');  // ถ้ามีค่าที่เกี่ยวข้องกับการล็อกอิน
        delete axios.defaults.headers.common['Authorization'];
        // ทำการ redirect ไปยังหน้าที่ต้องการ
        window.location.href = '/';
      };
    const handlesearching = (text) => {
        console.log('homestd get search ',text)
        setSearchtxt(text)
    }  
    return (
        <div>
            <Navstd onSearching={handlesearching} onLogout={handleLogout}/>
            <h1>Student : {stdID} </h1>
            <AnpageforStd txtsearch={searchtxt} key={forceRefresh}/>
        </div>
    )
}

export default Homestd
import React from "react";
import "./Announcepage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Navstd from "./components/Navstd";
import AnpageforStd from "./AnpageforStd";
import { Spin, Button, Modal, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
import { Flex } from 'antd';

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";
const URL_ANNOUNCE = "/api/announces";
const URL_SCORE = "/api/scores";

function Homestd(props) {
  const [forceRefresh, setForceRefresh] = useState(false);
  const [searchtxt, setSearchtxt] = useState("");
  const stdID = sessionStorage.getItem("stdID");

  const handleLogout = () => {
    // ล้างค่าทั้งหมดที่เกี่ยวข้องกับการล็อกอิน
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("IDuser");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("stdID"); // ถ้ามีค่าที่เกี่ยวข้องกับการล็อกอิน
    delete axios.defaults.headers.common["Authorization"];
    // ทำการ redirect ไปยังหน้าที่ต้องการ
    window.location.href = "/";
  };
  const [searchAn,setserchAn] = useState('')
  const searching = (event) =>{
    setserchAn(event.target.value)
  }

  const saveItem = (event) =>{
    event.preventDefault() //ไม่ให้จอรีเฟรช
    const itemData = {
       searchAn : searchAn,
    }
    console.log('item search',itemData)
    setSearchtxt(itemData.searchAn)
    setserchAn('')//ดึงข้อมูลมาแล้วก็เคลียค่าstateทิ้ง
    }

  


  return (
    <div>
      <Navstd onLogout={handleLogout} />
      <div className="group searcher">
        <form>
          <input
            type="text"
            onChange={searching}
            placeholder="ค้นหาประกาศ"
            className="search"
            value={searchAn}
          />
        </form>

        <Flex gap="small" vertical>
          <Flex wrap="wrap" gap="small">
            <Button
              onClick={saveItem}
              className="btn-searcher"
              icon={<SearchOutlined />}
            >
              Searcherrrrr
            </Button>
          </Flex>
        </Flex>
      </div>
      <h1>Student : {stdID} </h1>
      <AnpageforStd txtsearch={searchtxt} key={forceRefresh} />
    </div>
  );
}

export default Homestd;

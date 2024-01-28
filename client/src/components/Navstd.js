import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';

const Navstd = (props) => {
  // const [searchAn,setserchAn] = useState('')
  const role = localStorage.getItem('role')
  
//   const searching = (event) =>{
//     setserchAn(event.target.value)
//   }

//   const saveItem = (event) =>{
//     event.preventDefault() //ไม่ให้จอรีเฟรช
//     const itemData = {
//        searchAn : searchAn,
//     }
//     console.log('item search',itemData)
//     props.onSearching(itemData.searchAn)
//     setserchAn('')//ดึงข้อมูลมาแล้วก็เคลียค่าstateทิ้ง
// }

  return (
    <nav className="menu-bar">
      <div className="group"><Link to="/homestd" className="item title">{role}</Link></div>
      <div className="group"><button onClick={props.onLogout} className="btn-logout">Logout</button></div>
    </nav>
  );
};

export default Navstd;

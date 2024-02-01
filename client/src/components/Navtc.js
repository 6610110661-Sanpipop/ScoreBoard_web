import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navtc = (props) => {
  // const [searchAn,setserchAn] = useState('')
  const role = sessionStorage.getItem('role')

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
      <div className="group"><Link to="/admin" className="item title">{role}</Link></div>
      <div className="group"><button onClick={props.onLogout} className="btn-logout">Logout</button></div>
    </nav>
  );
};

export default Navtc;

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Announcepage from "./Announcepage";
import Navtc from "./components/Navtc";
import './components/Navtc.css'
import FormnewAn from "./components/FormnewAn";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";
const URL_ANNOUNCE = "/api/announces";
const URL_SCORES = "/api/scores"

function Hometc() {
  const [forceRefresh, setForceRefresh] = useState(false);
  const [dataForm,setDataForm] = useState('')
  const [searchtxt,setSearchtxt] = useState('')


  const handleLogout = () => {
    // ล้างค่าทั้งหมดที่เกี่ยวข้องกับการล็อกอิน
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('role');
    localStorage.removeItem('jwt');
    localStorage.removeItem('IDuser');
    localStorage.removeItem('username');
    localStorage.removeItem('stdID');  // ถ้ามีค่าที่เกี่ยวข้องกับการล็อกอิน
    delete axios.defaults.headers.common['Authorization'];
    // ทำการ redirect ไปยังหน้าที่ต้องการ
    window.location.href = '/';
  };

  const handleDelete = async (id) =>{
    try {
     // 1. ดึงข้อมูลประกาศที่ต้องการลบ
    const announceResponse = await axios.get(`${URL_ANNOUNCE}/${id}?populate=scores`);
    // 2. ดึงรายการคะแนนที่เกี่ยวข้องกับประกาศนี้
    const scores = announceResponse.data.data.attributes.scores.data;
    console.log('score must delete',scores)
    // 3. ลบทุกรายการคะแนนที่เกี่ยวข้อง
    const deleteScorePromises = scores.map(async (score) => {
      await axios.delete(`${URL_SCORES}/${score.id}`);
    });
     // 4. รอให้ทุกคำร้องลบคะแนนเสร็จสิ้น
    await Promise.all(deleteScorePromises);
    // 5. ลบประกาศ
    await axios.delete(`${URL_ANNOUNCE}/${id}`);
    // 6. อัปเดต state เพื่อ force refresh
    setForceRefresh(prev => !prev);
  } catch (error) {
    console.error("Error deleting announce and associated scores:", error);
  }
};

  const handlenewAn=(newAn)=>{
    console.log('Home get newAn',newAn)
    axios.post(URL_ANNOUNCE,{data:{
      Name : newAn,
      who_create: localStorage.getItem('IDuser')
    }});
    setForceRefresh(prev => !prev);
  }

  const handlechangename = (newName)=>{
    console.log('Home get new name',newName)
    axios.put(`${URL_ANNOUNCE}/${newName.id}`,{data:{
      Name : newName.newName 
    }});
    setForceRefresh(prev => !prev);
  }
  const [searchAn,setserchAn] = useState('')
  const searching = (event) =>{ //ติดตามว่าพิมอะไรอยู่
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
      <Navtc onLogout={handleLogout}/>
      <div className="searcher">
        <form>
          <input type="text" onChange={searching} placeholder="ค้นหาประกาศ" className="search" value={searchAn}/>
        </form>
        
        <Flex gap="small" vertical>
          <Flex wrap="wrap" gap="small">       
            <Button onClick={saveItem} className="btn-searcher" icon={<SearchOutlined />}>Search</Button>
          </Flex>
        </Flex>
      </div>
      <h1>Home for Admin "{localStorage.getItem('username')}"</h1>
      <FormnewAn onAddnewAn={handlenewAn}/>
      <Announcepage txtsearch={searchtxt} key={forceRefresh} onNewname={handlechangename} onDelete={handleDelete} /> 
    </div>
  );
}
export default Hometc;

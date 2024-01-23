import React from "react";
import "./Announcepage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Spin, Button, Modal, Form, Input } from "antd";
import Announcedetail from "./components/Announcedetail";
import ModaleditName from "./components/ModaleditName";
import { Link } from "react-router-dom";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";
const URL_ANNOUNCE = "/api/announces";
const URL_USER = "/api/users"

function Announcepage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [announce, setannounce] = useState([]);
  const [searchtxt,setSearchtxt] = useState(props.txtsearch)
  
  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const userID = localStorage.getItem('IDuser')
      const respon = await axios.get(`${URL_USER}/${userID}?populate=announces`)
      console.log('respon', respon.data.announces )
      const respon_map = respon.data.announces.map((e)=>{
        return {
          id:e.id,
          key:e.id,
          name:e.Name
        }
      })
      console.log('responmap',respon_map)
      setannounce([...respon_map]);
      
    } catch (err) {
      console.log(err);
    } finally {
      console.log("announce", announce);
      setIsLoading(false);
    }
  };

  const fetchSearch = async (txt) => {
    try {
      setIsLoading(true);
      const respon = await axios.get(`${URL_ANNOUNCE}?filters[Name][$eq]=${txt}`)
      console.log('responsearch', respon.data.data )
      const respon_map = respon.data.data.map((e)=>{
        return {
          id:e.id,
          key:e.id,
          name:e.attributes.Name
        }
      })
      console.log('responmapaftersearch',respon_map)
      setannounce([...respon_map]);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("announce after search", announce);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    const token = localStorage.getItem('jwt')
    axios.defaults.headers.common = { Authorization: `bearer ${token}` };
  }, []);

  

  useEffect(() => {
    if (props.txtsearch) {
      fetchSearch(props.txtsearch);
    }else {
      fetchItems();
    }
  }, [props.txtsearch]);


  
  const handlenewName = (newName) =>{
    props.onNewname(newName)
  }

  return (
    <div className="container">
      <Spin spinning={isLoading}>
        <h2>All Announce Page</h2>

        {/* divแต่ละก้อนที่ลูปมา */}
        {announce.map((announce) => (
          <div key={announce.id} className="container-div">
            <div className="edit-box">
              <h3>{announce.name}</h3>
              {/* <button className="buttonedit">edit</button> */}
              <ModaleditName idclicked={announce.id} onnewName={handlenewName} />
            </div>
            <p>นี่คือการประกาศคะแนนแห่งความสนุก</p>
            <div className="edit-box">
              <Link to={`/announce/${announce.id}`}>More detail</Link>
              <button onClick={() => props.onDelete(announce.id)}>Delete</button>
            </div>
            {/* แสดงข้อมูลอื่น ๆ ของกิจกรรมตามต้องการ */}
          </div>
        ))}

      </Spin>
    </div>
  );
}

export default Announcepage;

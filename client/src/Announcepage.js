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
      // const resresponse = await axios.get(`${URL_ANNOUNCE}?populate=*`); เอาทุกกิจกรรม
      // console.log("resrespon after get hometc", resresponse.data.data);
      // const resresponse_map = resresponse.data.data.map((d) => {
      //   return {
      //     id: d.id,
      //     key: d.id,
      //     name: d.attributes.Name,
      //   };
      // });
      // console.log("resrespon announce", resresponse_map);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("announce", announce);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);
  
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
            <p>นี่คือการประกาศคะแนนแห่งความชิบหาย</p>
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

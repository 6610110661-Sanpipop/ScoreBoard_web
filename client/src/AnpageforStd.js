import React from "react";
import "./Announcepage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Spin, Button, Modal, Form, Input } from "antd";
import ModaleditName from "./components/ModaleditName";
import { Link } from "react-router-dom";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";
const URL_ANNOUNCE = "/api/announces";
const URL_SCORE = "/api/scores"

function AnpageforStd(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [announce, setannounce] = useState([]);
  const encodedAnnounceArray = encodeURIComponent(JSON.stringify(announce));
  
  
  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const stdID = localStorage.getItem('stdID')
      console.log('stdID',stdID)
      const responn = await axios.get(`${URL_SCORE}?filters[studentID][$eq]=${stdID}&populate=announce`)
      console.log('respon std announce', responn.data.data )
      const respon_map = responn.data.data.map((e)=>{
        return {
          id:e.id,
          key:e.id,
          studentID:e.attributes.studentID,
          score:e.attributes.score,
          Status:e.attributes.Status,
          id_announce:e.attributes.announce.data.id,
          name:e.attributes.announce.data.attributes.Name
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
  }, []);

  

  useEffect(() => {
    if (props.txtsearch) {
      fetchSearch(props.txtsearch);
    }else {
      fetchItems();
    }
  }, [props.txtsearch]);

  return (
    <div className="container">
      <Spin spinning={isLoading}>
        <h2>All Announce Page</h2>

        {/* divแต่ละก้อนที่ลูปมา */}
        {announce.map((announce) => (
          <div key={announce.id} className="container-div">
            <div className="edit-box">
              <h3>{announce.name}</h3>
            </div>
            <p>นี่คือการประกาศคะแนนแห่งความชิบหาย</p>
            <div className="edit-box">
              <Link to={`/announcestd/${announce.id_announce}`}>More detail</Link>
            </div>
            
          </div>
        ))}

      </Spin>
    </div>
  );
}

export default AnpageforStd;

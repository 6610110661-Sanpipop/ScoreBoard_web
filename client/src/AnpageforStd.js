import React from "react";
import "./Announcepage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Spin, Button, Modal, Form, Input } from "antd";
import ModaleditName from "./components/ModaleditName";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";
const URL_ANNOUNCE = "/api/announces";
const URL_SCORE = "/api/scores";

function AnpageforStd(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [announce, setannounce] = useState([]);
  const [filter,setfilter] = useState('All')
  const stdID = sessionStorage.getItem("stdID");

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      console.log("stdID", stdID); //กรองคะแนนตามรหัสนักศึกษา และ แสดงด้วยว่าเป็นคะแนนของประกาศอะไรและนำไปแสดงในdiv
      const respon = await axios.get(
        `${URL_SCORE}?filters[studentID][$eq]=${stdID}&populate=announce`
      );
      console.log("respon std announce", respon.data.data);
      const respon_map = respon.data.data.map((e) => {
        return {
          id: e.id,
          key: uuidv4(),
          ...e.attributes,
          id_announce: e.attributes.announce.data.id,
          name: e.attributes.announce.data.attributes.Name,
        };
      });
      console.log("responmapAll", respon_map);
      setannounce([...respon_map]);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("announce", announce);
      setIsLoading(false);
    }
  };

  const fetchAccept = async () => {
    try {
      setIsLoading(true);  //กรองคะแนนตามรหัสนักศึกษา และ แสดงด้วยว่าเป็นคะแนนของประกาศอะไรและนำไปแสดงในdiv
      const respon = await axios.get(
        `${URL_SCORE}?filters[studentID][$eq]=${stdID}&populate=announce`
      );
      console.log("respon std announce", respon.data.data);
      const respon_map = respon.data.data.filter((e) => e.attributes.Accepted) // กรองเฉพาะที่ Accepted เท่านั้น
      .map((e) => ({
        id: e.id,
        key: uuidv4(),
        ...e.attributes,
        id_announce: e.attributes.announce.data.id,
        name: e.attributes.announce.data.attributes.Name,
      }));

      console.log("responaccept", respon_map);
      setannounce([...respon_map]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchnonAccept = async () => {
    try {
      setIsLoading(true);  //กรองคะแนนตามรหัสนักศึกษา และ แสดงด้วยว่าเป็นคะแนนของประกาศอะไรและนำไปแสดงในdiv
      const respon = await axios.get(
        `${URL_SCORE}?filters[studentID][$eq]=${stdID}&populate=announce`
      );
      console.log("respon std announce", respon.data.data);
      const respon_map = respon.data.data.filter((e) => e.attributes.Accepted===null) // กรองเฉพาะที่ Acceptedเป็นnull เท่านั้น
      .map((e) => ({
        id: e.id,
        key: uuidv4(),
        ...e.attributes,
        id_announce: e.attributes.announce.data.id,
        name: e.attributes.announce.data.attributes.Name,
      }));

      console.log("responnotaccept", respon_map);
      setannounce([...respon_map]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSearch = async (txt) => {
    try {
      setIsLoading(true);
      const respon = await axios.get(
        `${URL_ANNOUNCE}?filters[Name][$eq]=${txt}`
      );
      console.log("responsearch", respon.data.data);
      const respon_map = respon.data.data.map((e) => {
        return {
          id: e.id,
          key: uuidv4(),
          name: e.attributes.Name,
        };
      });
      console.log("responmapaftersearch", respon_map);
      setannounce([...respon_map]);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("announce after search", announce);
      setIsLoading(false);
    }
  };

  const fil_All = () => {
    setfilter('All')   
  }
  const fil_Accepted = () => {
    setfilter('Accepted')   
  }
  const fil_Non_Accept= () => {
    setfilter('nonAccepted')    
  }
  useEffect(()=>{
    console.log(filter)
    if (filter ==='Accepted'){
      fetchAccept()
    }else if (filter ==='nonAccepted'){
      fetchnonAccept()
    }else{
      fetchItems();
    }
  },[filter])

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (props.txtsearch) {
      fetchSearch(props.txtsearch);
    } else {
      fetchItems();
    }
  }, [props.txtsearch]);



  return (
    <div className="container">
      <Spin spinning={isLoading}>
        <div className="container-filter">
          <Button onClick={fil_Accepted}>Accepted</Button>
          <Button onClick={fil_Non_Accept}>Non-Accept</Button>
          <Button type="primary" onClick={fil_All}>All</Button>
        </div>
        <h2>ประกาศคะแนนสอบของคุณ</h2>

        {/* divแต่ละก้อนที่ลูปมา */}
        {announce.map((announce) => (
          <div key={announce.id} className="container-div">
            <div className="edit-box">
              <h3>{announce.name}</h3>
            </div>
            <p>นี่คือการประกาศคะแนนแห่งความปวดหัว</p>
            <div className="edit-box">
              <Link to={`/announcestd/${announce.id_announce}`}>
                More detail
              </Link>
            </div>
          </div>
        ))}
        <footer></footer>
      </Spin>
    </div>
  );
}

export default AnpageforStd;

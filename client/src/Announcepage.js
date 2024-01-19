import React from "react";
import "./Announcepage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Spin, Button, Modal, Form, Input } from "antd";
import Announcedetail from "./components/Announcedetail";
import { Link } from "react-router-dom";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";
const URL_ANNOUNCE = "/api/announces";

function Announcepage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [announce, setannounce] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${URL_ANNOUNCE}?populate=*`);
      console.log("respon after get hometc", response.data.data);
      const response_map = response.data.data.map((d) => {
        return {
          id: d.id,
          key: d.id,
          name: d.attributes.Name,
        };
      });
      console.log("respon announce", response_map);
      setannounce([...response_map]);
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

  return (
    <div className="container">
      <Spin spinning={isLoading}>
        <h2>All Announce Page</h2>
        {announce.map((announce) => (
          <div key={announce.id} className="container-div">
            <div className="edit-box">
              <h3>{announce.name}</h3>
              {/* <button className="buttonedit">edit</button> */}
              <Button type="primary" onClick={showModal} className="btn-edit">
                Edit
              </Button>
              <Modal
                title="Edit Announce Name"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <h1>input new name</h1>
                
              </Modal>
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

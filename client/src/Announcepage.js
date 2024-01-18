import React from "react";
import "./Announcepage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Spin } from "antd";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";
const URL_ANNOUNCE = "/api/announces";

function Announcepage() {
  const [isLoading, setIsLoading] = useState(false);
  const [announce, setannounce] = useState([]);

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
            <h3>{announce.name}</h3>
            <p>นี่คือการประกาศคะแนนแห่งความชิบหาย</p>
            {/* แสดงข้อมูลอื่น ๆ ของกิจกรรมตามต้องการ */}
          </div>
        ))}
      </Spin>
    </div>
  );
}

export default Announcepage;

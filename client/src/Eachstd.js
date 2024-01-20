import "./App.css";
import { useState, useEffect, useContext } from "react";
import { Spin, Divider, Typography } from "antd";
import axios from "axios";
import Tablescores from "./components/Tablescores";
import Navstd from "./components/Navstd";
import './decoration/Navtc.css'
//กรองข้อมูลในตารางจากตัวเลขในเมล
axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";
const URL_SCORES = "/api/scores";

function Eachstd(props) {
  const std_id = localStorage.getItem('stdID');
  const [isLoading, setIsLoading] = useState(false);
  const [datascore, setdatascore] = useState([]);
  // const std_id = props.whoLogin;
  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${URL_SCORES}?populate=*&filters[studentID][$eq]=${std_id}`
      );
      console.log("respon after get", response.data.data);
      const response_scores = response.data.data.map((d) => {
        return {
          id: d.id,
          key: d.id,
          ...d.attributes,
          announce: d.attributes.announce.data.attributes.Name,
        };
      });
      console.log("respon score", response_scores);
      setdatascore([...response_scores]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleLogout = () => {
    // ล้างค่าทั้งหมดที่เกี่ยวข้องกับการล็อกอิน
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('IDuser');
    localStorage.removeItem('stdID');  // ถ้ามีค่าที่เกี่ยวข้องกับการล็อกอิน
    delete axios.defaults.headers.common['Authorization'];
    // ทำการ redirect ไปยังหน้าที่ต้องการ
    window.location.href = '/';
  };

  return (
    <>
      <Navstd onLogout={handleLogout} />
      
      <div className="App">
        <header>
          <Spin spinning={isLoading}>
            <h1>This is student ID {std_id}</h1>
            <h2>Data Scores from Strapi</h2>
            <Tablescores data={datascore} />
          </Spin>
        </header>
      </div>
    </>
  );
}

export default Eachstd;

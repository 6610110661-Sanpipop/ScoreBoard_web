import "./App.css";
import { useState, useEffect } from "react";
import { Spin, Divider, Typography } from "antd";
import axios from "axios";
import Tablescores from "./components/Tablescores";
import Navtc from "./components/Navtc";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";
const URL_SCORES = "/api/scores";

function Teacherpage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [datascore, setdatascore] = useState([]);
  
  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${URL_SCORES}?populate=*`);
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
    localStorage.removeItem('stdID');  // ถ้ามีค่าที่เกี่ยวข้องกับการล็อกอิน
    delete axios.defaults.headers.common['Authorization'];
    // ทำการ redirect ไปยังหน้าที่ต้องการ
    window.location.href = '/';
  };

  return (
    <>
      <Navtc onLogout={handleLogout}/>
      <div className="App">
        <header>
          <Spin spinning={isLoading}>
            <h1>This is Teacher page</h1>
            <h2>Data Scores from Strapi</h2>
            <Tablescores data={datascore} />
          </Spin>
        </header>
      </div>
    </>
  );
}

export default Teacherpage;

import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Navstd from "./Navstd";
import Readexcel from "./Readexcel";
import Tablescores from "./Tablescores";
import { Spin } from "antd";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";
const URL_SCORES = "/api/scores";
const URL_ANNOUNCE = "/api/announces"

//กรองข้อมูลในตารางจากidของannounce ที่กดเข้ามา
const AndetailforStd = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [announceDetail, setAnnounceDetail] = useState({});
    const [datascore, setdatascore] = useState([]);
    
    
    const fetchAnnounceDetail = async () => {
      try {
        setIsLoading(true);
        console.log('id',id)
        const stdID = localStorage.getItem('stdID')
        const response = await axios.get(`/api/announces/${id}?populate=*`);
        console.log('this is announce id that clicked', response.data.data);
        const response_announce = { //เซ็ตข้อมูลต่างๆของannounce ที่กดเข้ามา
          id: response.data.data.id,
          ANname : response.data.data.attributes.Name
        };
        console.log("respon announce map", response_announce);
        setAnnounceDetail(response_announce);
        
        //ดึงข้อมูลกิจกรรมที่กดแล้วก็คะแนนของกิจกรรมนั้นมาให้ได้

        // const response_scores = response.data.data.attributes.scores.data.map((d) => {
        //     return { //ข้อมูลscore ที่จะเอาไปใส่ในtableดึงจากstrapi
        //       id: d.id,
        //       key: d.id,
        //       ...d.attributes, 
        //       announce: response.data.data.attributes.Name
        //     };
        //   });
        //   console.log("respon announce map for score", response_scores);
        //   setdatascore([...response_scores]);
      } catch (error) {
        console.error("Error fetching announce detail:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
  
    useEffect(() => {
      fetchAnnounceDetail();
    }, []);
  
    const handleLogout = () => {
      // ล้างค่าทั้งหมดที่เกี่ยวข้องกับการล็อกอิน
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('role');
      localStorage.removeItem('IDuser');
      localStorage.removeItem('stdID');  // ถ้ามีค่าที่เกี่ยวข้องกับการล็อกอิน
      delete axios.defaults.headers.common['Authorization'];
      window.location.href = '/';
    };

    return (
      <div>
        <Spin spinning={isLoading}> 
        <Navstd  onLogout={handleLogout}/>
          <h2>{announceDetail.ANname}</h2>
          <h3>Announce Detail</h3>
          <div><Tablescores data={datascore} /></div>
        </Spin>
      </div>
    );
  };
  
  export default AndetailforStd;
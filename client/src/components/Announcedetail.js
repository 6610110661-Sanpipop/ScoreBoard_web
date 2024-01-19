import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Navtc from "./Navtc";
import Tablescores from "./Tablescores";
import { Spin } from "antd";
//กรองข้อมูลในตารางจากidของannounce ที่กดเข้ามา
const AnnounceDetail = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [announceDetail, setAnnounceDetail] = useState({});
    const [datascore, setdatascore] = useState([]);
  
    const fetchAnnounceDetail = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/announces/${id}?populate=*`);
        console.log('this is announce id that clicked', response.data.data);

        const response_announce = { //เซ็ตข้อมูลต่างๆของannounce ที่กดเข้ามา
          id: response.data.data.id,
          ...response.data.data.attributes
        };
        console.log("respon announce map", response_announce);
        setAnnounceDetail(response_announce);

        const response_scores = response.data.data.attributes.scores.data.map((d) => {
            return { //ข้อมูลscore ที่จะเอาไปใส่ในtable
              id: d.id,
              key: d.id,
              ...d.attributes, 
              announce: response.data.data.attributes.Name
            };
          });
          console.log("respon announce map for score", response_scores);
          setdatascore([...response_scores]);
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
      localStorage.removeItem('stdID');  // ถ้ามีค่าที่เกี่ยวข้องกับการล็อกอิน
      delete axios.defaults.headers.common['Authorization'];
      // ทำการ redirect ไปยังหน้าที่ต้องการ
      window.location.href = '/';
    };
  
    return (
      <div>
        <Spin spinning={isLoading}> 
          <Navtc onLogout={handleLogout}/>
          <h2>Name: {announceDetail.Name}</h2>
          <h3>Announce Detail</h3>
          <div><Tablescores data={datascore} /></div>
        </Spin>
      </div>
    );
  };
  
  export default AnnounceDetail;
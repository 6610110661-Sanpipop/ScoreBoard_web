import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Navtc from "./Navtc";
import Readexcel from "./Readexcel";
import Tablescores from "./Tablescores";
import { Spin } from "antd";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";
const URL_SCORES = "/api/scores";

//กรองข้อมูลในตารางจากidของannounce ที่กดเข้ามา
const AnnounceDetail = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [announceDetail, setAnnounceDetail] = useState({});
    const [datascore, setdatascore] = useState([]);
    const [dataForpost,setDataForpost] = useState([])
    
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
            return { //ข้อมูลscore ที่จะเอาไปใส่ในtableดึงจากstrapi
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
      localStorage.removeItem('IDuser');
      localStorage.removeItem('stdID');  // ถ้ามีค่าที่เกี่ยวข้องกับการล็อกอิน
      delete axios.defaults.headers.common['Authorization'];
      // ทำการ redirect ไปยังหน้าที่ต้องการ
      window.location.href = '/';
    };

    const handleAddscore = (item) =>{//อ่านค่าจากexcell แมพเป็นอาเรมาใช้
      console.log('data form excel',item)
      const itemTOpost = item.map((e)=>{
        return {
          studentID:e.studentID.toString(),
          score:e.score,
          Status:e.Status,
          announce: announceDetail.id
        }})
      console.log('itemtopost',itemTOpost)
      setDataForpost([...itemTOpost])
    }

    const posting = async () => {//postเมื่อกดปุ่ม
      console.log('prepare post', dataForpost);
      
      try {
        const postRequests = dataForpost.map(async (item) => {
          console.log('wtf', item);
          const response = await axios.post(URL_SCORES, { data: {
            studentID: item.studentID,
            score: item.score,
            Status: item.Status,
            announce: item.announce
          } });
          console.log('Response after posting score:', response.data);
        });
    
        await Promise.all(postRequests);
      } catch (error) {
        console.error('Error posting scores:', error);
        // Handle error, e.g., show error message to the user
      } finally {
        setDataForpost([]);
      }
    };
    
    
  
    return (
      <div>
        <Spin spinning={isLoading}> 
          <Navtc onLogout={handleLogout}/>
          <h2>{announceDetail.Name}</h2>
          <h3>อัพโหลดไฟล์excelของคุณ</h3>
          <Readexcel onAddscore={handleAddscore}/>
          <button onClick={posting}>เพิ่มคะแนน</button>
          <h3>Announce Detail</h3>
          <div><Tablescores data={datascore} /></div>
        </Spin>
      </div>
    );
  };
  
  export default AnnounceDetail;
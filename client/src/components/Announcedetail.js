import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Navtc from "./Navtc";
import Readexcel from "./Readexcel";
import TablescoresTC from "./TablescoresTC";
import { Spin } from "antd";
import BtnUploadsc from "./BtnUploadsc";
import {v4 as uuidv4} from 'uuid';

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
    const [dataForpreview,setDataForpreview] = useState([])
    const [forceRefresh, setForceRefresh] = useState(false);
    
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
    useEffect(() => {
      fetchAnnounceDetail();
    }, [forceRefresh]);
  
    const handleLogout = () => {
      // ล้างค่าทั้งหมดที่เกี่ยวข้องกับการล็อกอิน
      sessionStorage.removeItem('isAuthenticated');
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('IDuser');
      sessionStorage.removeItem('stdID');  
      delete axios.defaults.headers.common['Authorization'];
      // ทำการ redirect ไปยังหน้าแรก
      window.location.href = '/';
    };

    const handleAddscore = (item) =>{//อ่านค่าจากexcell แมพเป็นอาเรมาใช้
      console.log('data form excel',item)
      const itemTOpost = item.map((e)=>{
        return {
          key: uuidv4(),
          studentID:e.studentID.toString(),
          score:e.score,
          Status:e.Status,
          announce: announceDetail.id
        }})
      const itemTOpreview = item.map((e)=>{
        return {
          key: uuidv4(),
          studentID:e.studentID.toString(),
          score:e.score,
          Status:e.Status,
          announce: announceDetail.Name
        }})
      console.log('itemtopost',itemTOpost)
      console.log('itemtopreview',itemTOpreview)
      setDataForpost([...itemTOpost])
      setDataForpreview([...itemTOpreview])
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
      } finally {
        setDataForpost([]);
        setForceRefresh(prev => !prev)
      }
    };
    
    
  
    return (
      <div>
        <Spin spinning={isLoading}> 
          <Navtc onLogout={handleLogout}/>
          <h2>{announceDetail.Name}</h2>
          <h3>อัพโหลดไฟล์excelของคุณ</h3>
          <Readexcel onAddscore={handleAddscore}/>
          <div className="btn-upload"><BtnUploadsc data={dataForpreview} funcPost={posting}/></div>         
          <h3>รายละเอียดคะแนน</h3>
          <div className="tableTC">
            <TablescoresTC data={datascore} />
          </div>
          <footer></footer>
        </Spin>
      </div>
    );
  };
  
  export default AnnounceDetail;
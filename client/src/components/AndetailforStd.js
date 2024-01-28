import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Navstd from "./Navstd";
import Tablescores from "./Tablescores";
import { Spin } from "antd";
import "./AndetailforStd.css"
import { read } from "xlsx";

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
    const [idscore,setidscore] = useState({})
    const [isAccepted,setisAccepted] = useState(false)
    const [readed, setreaded] = useState('');
    
    const fetchAnnounceDetail = async () => {
      try {
        setIsLoading(true);
        console.log('id',id)
        const stdID = localStorage.getItem('stdID')
        const response = await axios.get(`/api/announces/${id}?populate=*`);
        console.log('this is announce id that clicked', response.data.data);
        const response_announce = { //เซ็ตข้อมูลต่างๆของannounce ที่กดเข้ามา
          id: response.data.data.id,
          key: response.data.data.id,
          ANname : response.data.data.attributes.Name
        };
        console.log("respon announce map", response_announce);
        setAnnounceDetail(response_announce);
        
        //เช็คจากที่populateจากกิจกรรมที่กดเข้ามาว่าอันไหนที่รหัสเดียวกับรหัสที่loginเข้ามา

        const response_scores = response.data.data.attributes.scores.data.map((d) => {
          if (d.attributes.studentID === stdID){
              const yourscore = {
                id: d.id,
                 key: d.id, 
                 ...d.attributes, 
                 announce: response.data.data.attributes.Name
              } 
              if (d.attributes.Accepted){
                setisAccepted(true)
              } else{ 
                setisAccepted(false)
              }

              if (d.attributes.Viewed) {
                setreaded('true');
              } else {
                setreaded('false');
              }

              console.log('my score',yourscore)
              setidscore(yourscore)
              setdatascore([yourscore])
              return yourscore        
          }});          
        console.log("respon announce map for score",response_scores );         
      } catch (error) {
        console.error("Error fetching announce detail:", error);
      } finally {
        console.log('isaccepted',isAccepted)     
        setIsLoading(false);
      }
    };
    
    
    useEffect(() => {
      fetchAnnounceDetail()
    }, []);

    useEffect(()=>{
      //จับเวลา3วิ
      const timer = setTimeout(async () => {      
        const date = new Date();
        handleViewed(date)
      }, 3000);
      // Clear the timer if the component unmounts
      return () => clearTimeout(timer);
    },[idscore])
    
    const handleViewed= async (date)=>{
      console.log('view',date)
      console.log('readed',readed)
      console.log('idscoreview',idscore.Viewed)
      if(readed === 'false' && idscore.id) {
        console.log('enter')
        const responsee = await axios.put(`${URL_SCORES}/${idscore.id}`, { data: { Viewed: date } });
        console.log(responsee);
      }
    }

    const handleLogout = () => {
      // ล้างค่าทั้งหมดที่เกี่ยวข้องกับการล็อกอิน
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('role');
      localStorage.removeItem('IDuser');
      localStorage.removeItem('stdID');  
      delete axios.defaults.headers.common['Authorization'];
      window.location.href = '/';
    };

    const handleaccept=async()=>{
      setisAccepted(true)
      const date = new Date()
      console.log('accept',date)
      const responce =  await axios.put(`${URL_SCORES}/${idscore.id}`,{data:{Accepted:date}})
      console.log(responce)
    }


    return (
      <div>
        <Spin spinning={isLoading}> 
        <Navstd  onLogout={handleLogout}/>
        <div className="container-detail">
          <div className="ANname"><h2>{announceDetail.ANname}</h2></div>
          <h3>คะแนนที่คุณทำได้</h3>
          <div><Tablescores  data={datascore} /></div> 
          <div className="container-btn">
            {/* <button onClick={handleaccept} className="btn-accept">Accept</button> */}
            {!isAccepted && <button onClick={handleaccept} className="btn-accept">Accept</button>}
            {isAccepted && <button className="btn-accepted">Accepted!!</button>}
          </div>
        </div>
          
        </Spin>
      </div>
    );
  };
  
  export default AndetailforStd;
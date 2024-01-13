import './App.css';
import { useState,useEffect } from 'react';
import { Spin, Divider, Typography } from "antd";
import axios from 'axios';
import Tablescores from './components/Tablescores';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337";
const URL_SCORES= "/api/scores";

function Stdmain() {
    const [isLoading, setIsLoading] = useState(false);
    const [datascore, setdatascore] = useState([])
    const fetchItems = async () =>{
         try{
            setIsLoading(true)
            const response = await axios.get(`${URL_SCORES}?populate=*&filters[studentID][$eq]=6610110661`)
            console.log('respon after get',response.data.data)
            const response_scores = response.data.data.map((d)=>{
                return {
                    id : d.id,
                    key : d.id,
                    ...d.attributes,
                    announce : d.attributes.announce.data.attributes.Name
                }
            })
            console.log('respon score',response_scores)
            setdatascore([...response_scores])
         } catch(err){
            console.log(err)
         } finally {
            setIsLoading(false)
         }
    }

    useEffect(()=>{
        fetchItems();
    },[]);

  return (
    <div className="App">
        <header>
            <Spin spinning={isLoading}>
                <h1>This is student page</h1>
                <h2>Data Scores from Strapi</h2>
                <Tablescores data={datascore}/>
            </Spin>
        </header>
    </div>
  );
}

export default Stdmain;

import './App.css';
import axios from "axios";
import { useEffect, useState } from "react";
import Teacherpage from './Teacherpage'; // component
import LoginScreen from './LoginScreen';
import Eachstd from './Eachstd';
import Hometc from './Hometc';
import Homestd from './Homestd';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [role,setRole] = useState('')

  useEffect(()=>{
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth){
      setIsAuthenticated(storedAuth === 'true');
    }
  },[])

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
    localStorage.setItem('isAuthenticated','true') //3.setisAuthenticated
    console.log('loginsuccess');
  };

   
  const handleSetRole = (who) =>{
    setRole(who)
  }
  

  return (
    
      <div className='App'>
        <header className="App-header">
          {/* {!isAuthenticated &&
            <LoginScreen onLoginSuccess={handleLoginSuccess} onSetRole={handleSetRole} />}
          {isAuthenticated && 
            <Eachstd />}    */}

          {isAuthenticated && role ? (role === 'Student' ? <Homestd /> : <Hometc />) : 
          (<LoginScreen onLoginSuccess={handleLoginSuccess} onSetRole={handleSetRole}/>)}
        </header>
      </div>
      
      // <div>
      // {/* ถ้ามี token, แสดงหน้า Home, ไม่มีแสดงหน้า Login */}
      // {jwt ? <Eachstd whoLogin={std_id} jwt={jwt} /> : <Login_Screen onLogin={handleLogin} onAddID={onAddstdID} />}
      // </div>
  );
}

export default App;

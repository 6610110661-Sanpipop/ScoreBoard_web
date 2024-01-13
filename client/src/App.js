import './App.css';
import axios from "axios";
import { useState } from "react";
import Stdmain from './Stdmain'; // component
import LoginScreen from './LoginScreen';
import Eachstd from './Eachstd';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
    console.log('loginsuccess');
  };

  

  return (
    <div className='App'>
      <header className="App-header">
        {!isAuthenticated &&
          <LoginScreen onLoginSuccess={handleLoginSuccess} />}
        {isAuthenticated && 
          <Stdmain />}
          
      </header>
    </div>
  );
}

export default App;

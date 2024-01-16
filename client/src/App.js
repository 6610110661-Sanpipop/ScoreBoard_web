import './App.css';
import axios from "axios";
import { useState } from "react";
import Stdmain from './Stdmain'; // component
import LoginScreen from './LoginScreen';
import Eachstd from './Eachstd';
import Datacontext from './data/Datacontext';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
    console.log('loginsuccess');
  };

  

  return (
    <Datacontext.Provider value="6610110661">
      <div className='App'>
        <header className="App-header">
          {!isAuthenticated &&
            <LoginScreen onLoginSuccess={handleLoginSuccess} />}
          {isAuthenticated && 
            <Eachstd />}
          
        </header>
      </div>
    </Datacontext.Provider>
  );
}

export default App;

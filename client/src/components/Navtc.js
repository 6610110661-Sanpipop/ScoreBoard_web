import React from "react";
import { Link } from "react-router-dom";


const Navtc = (props) => {
  return (
    <nav className="menu-bar">
      <div className="group"><Link to="/admin" className="item title">Admin</Link></div>
      <div className="group"><button onClick={props.onLogout} className="item-button">Logout</button></div>
    </nav>
  );
};

export default Navtc;

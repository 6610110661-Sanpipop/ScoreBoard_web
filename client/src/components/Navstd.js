import React from "react";
import { Link } from "react-router-dom";

const Navstd = (props) => {
  return (
    <nav className="menu-bar">
      <div className="group"><Link to="/home" className="item title">Student</Link></div>
      <div className="group"><button onClick={props.onLogout} className="item-button">Logout</button></div>
    </nav>
  );
};

export default Navstd;

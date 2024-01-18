import React from "react";
import { Link } from "react-router-dom";

const Navstd = (props) => {
  return (
    <nav>
      <Link to="/home">Student</Link>
      <button onClick={props.onLogout}>Logout</button>
    </nav>
  );
};

export default Navstd;

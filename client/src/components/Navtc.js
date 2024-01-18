import React from "react";
import { Link } from "react-router-dom";

const Navtc = (props) => {
  return (
    <nav>
      <Link to="/admin">Admin</Link>
      <button onClick={props.onLogout}>Logout</button>
    </nav>
  );
};

export default Navtc;

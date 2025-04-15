import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="text-center mt-1">
        <Link to="/">
          {" "}
          <h1 className="text-2xl font-bold font-other">Electronic Medical Records Management System</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;

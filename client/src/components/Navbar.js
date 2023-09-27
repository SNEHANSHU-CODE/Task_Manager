import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "./MyContext";

function Navbar() {
  const { id, setId } = useContext(MyContext);
  const handleLogout = () => {
    setId("");
  };
  return (
    <div
      className="navbar navbar-expand-lg bg-light justify-content-between"
      style={{ maxHeight: 64 }}
    >
      <div className="container-fluid">
        <span className="navbar-brand">Task Manager</span>
      </div>
      <div className="nav mx-4">
        {id !== "" ? (
          <span className="nav-item active" onClick={handleLogout}>
            <Link className="nav-link" to="/">
              Logout
            </Link>
          </span>
        ) : (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <li className="nav-item active">
              <Link className="nav-link" to="/Signup">
                Signup
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Login
              </Link>
            </li>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

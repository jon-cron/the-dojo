import React from "react";
import "./Navbar.css";
import Temple from "../../assets/temple.svg";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout.js";
export default function Navbar() {
  const { logout, isPending } = useLogout();
  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="dojo" />
          <span>The Dojo</span>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          {!isPending && (
            <button className="btn" onClick={logout}>
              Logout
            </button>
          )}
          {isPending && (
            <button disabled className="btn">
              logging out
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}

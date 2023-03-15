import React from "react";
import "./Sidebar.css";
import DashboardIcon from "../../assets/dashboard_icon.svg";
import AddIcon from "../../assets/add_icon.svg";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import Avatar from "../Avatar/Avatar.js";
export default function Sidebar() {
  const { user } = useAuthContext();
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={user.photoURL} />
          <p>Hey {user.displayName}</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              {/* NOTE NavLinks have an active effect when selected. We can use that effect to style them differently */}
              <NavLink to="/">
                <img src={DashboardIcon} alt="dashboard" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="create" />
                <span>Create</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

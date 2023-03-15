import "./ProjectList.css";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar.js";
export default function ProjectList({ projects }) {
  return (
    <div className="project-list">
      {projects.length === 0 && <p>No projects</p>}
      {projects.map((p) => (
        <Link to={`projects/${p.id}`} key={p.id}>
          <h4>{p.name}</h4>
          <p>Due by: {p.dueDate.toDate().toDateString()}</p>
          <div className="assigned-to">
            <ul>
              {p.assignedUsersList.map((u) => (
                <li title={u.displayName} key={u.displayName}>
                  <Avatar src={u.photoURL} />
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
}

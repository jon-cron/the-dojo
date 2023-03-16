import React from "react";
import Avatar from "../../components/Avatar/Avatar.js";
import { useFirestore } from "../../hooks/useFirestore.js";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { useNavigate } from "react-router-dom";
export default function ProjectSummary({ project }) {
  const navigate = useNavigate();
  const { deleteDocument } = useFirestore("projects");
  const { user } = useAuthContext();
  const handleClick = (e) => {
    deleteDocument(project.id);
    navigate("/");
  };
  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p>By {project.createdBy.displayName}</p>
        <p className="due-date">
          Project due by: {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>Project is assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((u) => (
            <div key={u.id}>
              <Avatar src={u.photoURL} />
            </div>
          ))}
        </div>
        {user.uid === project.createdBy.id && (
          <button className="btn" onClick={handleClick}>
            Complete
          </button>
        )}
      </div>
    </div>
  );
}

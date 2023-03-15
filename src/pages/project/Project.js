import React from "react";
import "./Project.css";
import { useDocument } from "../../hooks/useDocument.js";
import { useParams } from "react-router-dom";
import ProjectSummary from "./ProjectSummary.js";
export default function Project() {
  const { id } = useParams();
  const { document, error } = useDocument("projects", id);
  console.log(document, error);

  // NOTE this is another way of conditionally rendering errors to the dom
  // if(error){
  //   return <div className="error">{error}</div>
  // }
  // if(!document){
  //   return <div className="loading">loading...</div>
  // }

  return (
    <div className="project-details">
      {error && <div className="error">{error}</div>}
      {document && <ProjectSummary project={document} />}
    </div>
  );
}

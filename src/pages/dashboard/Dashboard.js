import "./Dashboard.css";
import { useCollection } from "../../hooks/useCollection.js";
import ProjectList from "../../components/projectList/ProjectList.js";
import ProjectFilter from "./ProjectFilter.js";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext.js";
export default function Dashboard() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("projects");
  // NOTE I am making state and functions within the parent component to pass down as props and get back a value from my project filter child to then use that state in my other child comp projectList
  const [currentFilter, setCurrentFilter] = useState("all");
  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const projects = documents
    ? // NOTE this code will error if you do not make sure that there are documents to filter through.
      documents.filter((document) => {
        switch (currentFilter) {
          case "all":
            return true;
          case "mine":
            let assignedToMe = false;
            document.assignedUsersList.forEach((u) => {
              if (u.id === user.uid) {
                assignedToMe = true;
              }
            });
            return assignedToMe;
          // NOTE if the code is going to be the same for several cases you can stack them on top of each and use the same logic for all of them
          case "development":
          case "design":
          case "sales":
          case "marketing":
            console.log(document.category, currentFilter);
            return document.category === currentFilter;
          default:
            return true;
        }
      })
    : null;

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <div className="error">{error}</div>}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {documents && <ProjectList projects={projects} />}
    </div>
  );
}

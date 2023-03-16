import "./Dashboard.css";
import { useCollection } from "../../hooks/useCollection.js";
import ProjectList from "../../components/projectList/ProjectList.js";
import ProjectFilter from "./ProjectFilter.js";
import { useState } from "react";
export default function Dashboard() {
  const { documents, error } = useCollection("projects");
  // NOTE I am making state and functions within the parent component to pass down as props and get back a value from my project filter child to then use that state in my other child comp projectList
  const [currentFilter, setCurrentFilter] = useState("all");
  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };
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
      {documents && <ProjectList projects={documents} />}
    </div>
  );
}

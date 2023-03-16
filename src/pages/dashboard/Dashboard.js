import "./Dashboard.css";
import { useCollection } from "../../hooks/useCollection.js";
import ProjectList from "../../components/projectList/ProjectList.js";
import ProjectFilter from "./ProjectFilter.js";
export default function Dashboard() {
  const { documents, error } = useCollection("projects");
  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <div className="error">{error}</div>}
      {documents && <ProjectFilter />}
      {documents && <ProjectList projects={documents} />}
    </div>
  );
}

import { useState } from "react";
import "./Create.css";
// NOTE to use Select you must run "npm install react-select" then import the Select
import Select from "react-select";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];
export default function Create() {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, details, dueDate, category.value);
  };
  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
          />
        </label>
        <label>
          <span>Details</span>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            type="text"
            required
          />
        </label>
        <label>
          <span>Due Date</span>
          <input
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            type="date"
            required
          />
        </label>
        <label>
          <span>Project Category:</span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </label>
        <label>
          <span>Assign to:</span>
        </label>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}

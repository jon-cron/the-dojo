//styles
import "./Create.css";
// NOTE to use Select you must run "npm install react-select" then import the Select
//react imports
import { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
//hooks
import { useCollection } from "../../hooks/useCollection.js";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { useFirestore } from "../../hooks/useFirestore.js";
//firebase
import { timestamp } from "../../firebase/config.js";
//variables
const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];
export default function Create() {
  //hooks
  const navigate = useNavigate();
  const { documents } = useCollection("users");
  const { user } = useAuthContext();
  const { addDocument, response } = useFirestore("projects");
  //state
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);
  //logic
  useEffect(() => {
    // NOTE upon page load documents will be null but when that changes we will rerun this function and set our users to the select in the form
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (!category) {
      setFormError("Please select category");
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError("Please assign users");
      return;
    }
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };
    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });
    const project = {
      name,
      details,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      category: category.value,
      comments: [],
      createdBy,
      assignedUsersList,
    };
    await addDocument(project);
    if (!response.error) {
      formReset();
      navigate("/");
    }
  };
  const formReset = () => {
    setName("");
    setDetails("");
    setDueDate("");
    setCategory("");
    setAssignedUsers([]);
    setFormError(null);
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
          <Select
            options={users}
            onChange={(option) => setAssignedUsers(option)}
            // NOTE isMulti allows the user to select multiple options
            isMulti
          />
        </label>
        <button className="btn">Submit</button>
        {formError && <div className="error">{formError}</div>}
      </form>
    </div>
  );
}

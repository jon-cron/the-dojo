import "./App.css";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
//pages
import Dashboard from "./pages/dashboard/Dashboard.js";
import Login from "./pages/login/Login.js";
import Signup from "./pages/signup/Signup.js";
import Create from "./pages/create/Create.js";
import Project from "./pages/project/Project.js";
import Navbar from "./components/navbar/Navbar.js";
import Sidebar from "./components/sidebar/Sidebar.js";
function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <div className="container">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/create" element={<Create />} />
            <Route path="/projects/:id" element={<Project />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

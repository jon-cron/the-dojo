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
import { useAuthContext } from "./hooks/useAuthContext.js";
function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <Router>
          <Sidebar />
          <div className="container">
            <Navbar />
            <Routes>
              <Route
                exact
                path="/"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
              <Route
                path="/create"
                element={user ? <Create /> : <Navigate to="/login" />}
              />
              <Route
                path="/projects/:id"
                element={user ? <Project /> : <Navigate to="/login" />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;

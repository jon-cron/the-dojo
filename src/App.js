import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.js";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

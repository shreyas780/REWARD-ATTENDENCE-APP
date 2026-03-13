import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from "./signin";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        
        {/* Header */}
        <header style={{ marginBottom: "20px" }}>
          <Link to="/signin">
            <button>Sign In</button>
          </Link>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
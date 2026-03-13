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
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">

        {/* Header */}
        <header className="flex justify-between items-center p-6">
          <h1 className="text-2xl font-bold">Reward Attendance</h1>

          <Link to="/signin">
            <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
              Sign In
            </button>
          </Link>
        </header>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto p-6">

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
      </div>
    </Router>
  );
}

export default App;
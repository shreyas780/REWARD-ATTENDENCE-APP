import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import SignIn from './signin'; // ✅ Import the SignIn page

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Global Sign In Button in the header */}
        <header className="p-4 bg-white shadow flex justify-end">
          <Link to="/signin"> {/* ✅ Updated link */}
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Sign In
            </button>
          </Link>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} /> {/* ✅ New route */}
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

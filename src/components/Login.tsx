import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("reward_app_users") || "[]");
    const user = users.find((u: any) => u.usn === usn);

    if (!user) {
      setError("User not found");
      return;
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      setError("Invalid password");
      return;
    }

    // Store logged-in user
    localStorage.setItem("logged_in_user", JSON.stringify(user));

    alert("Login successful!");
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <label>USN:</label>
          <br />
          <input
            type="text"
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
            required
            style={{
              padding: "8px",
              width: "100%",
              color: "black",
              borderRadius: "5px",
              border: "1px solid gray"
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "8px",
              width: "100%",
              color: "black",
              borderRadius: "5px",
              border: "1px solid gray"
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "white",
            color: "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Sign In
        </button>
      </form>

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Login;
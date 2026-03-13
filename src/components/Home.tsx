import React from "react";

function Home() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Reward Attendance App</h1>
      <p>Welcome to the attendance reward system.</p>

      <div style={{ marginTop: "20px" }}>
        <a href="/register">
          <button style={{ marginRight: "10px" }}>Register</button>
        </a>

        <a href="/login">
          <button>Login</button>
        </a>
      </div>
    </div>
  );
}

export default Home;
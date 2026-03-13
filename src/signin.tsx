import React from "react";

function SignIn() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h2>Sign In</h2>

      <form>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="email"
            placeholder="Enter your email"
            style={{ padding: "8px", width: "250px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="Enter your password"
            style={{ padding: "8px", width: "250px" }}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default SignIn;
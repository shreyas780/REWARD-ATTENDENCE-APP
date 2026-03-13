import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bcrypt from "bcryptjs";

const Login: React.FC = () => {

const navigate = useNavigate();

const [usn, setUsn] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

const handleLogin = (e: React.FormEvent) => {

```
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

localStorage.setItem("logged_in_user", JSON.stringify(user));

navigate("/dashboard");
```

};

return (

```
<div className="min-h-screen bg-gray-100 flex items-center justify-center">

  <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

    <h2 className="text-2xl font-bold text-center mb-6">
      Student Login
    </h2>

    <form onSubmit={handleLogin} className="space-y-4">

      <div>
        <label className="text-sm font-medium">USN</label>
        <input
          type="text"
          value={usn}
          onChange={(e) => setUsn(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-1"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-1"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
      >
        Sign In
      </button>

    </form>

    {error && (
      <p className="text-red-500 mt-4 text-center">
        {error}
      </p>
    )}

    <p className="text-sm text-center mt-4">
      Don't have an account?{" "}
      <Link to="/register" className="text-indigo-600">
        Register
      </Link>
    </p>

  </div>

</div>
```

);
};

export default Login;

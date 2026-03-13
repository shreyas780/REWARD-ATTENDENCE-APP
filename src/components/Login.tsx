import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {

const [usn, setUsn] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

const handleLogin = (e: React.FormEvent) => {
e.preventDefault();

```
const storedUser = localStorage.getItem("user");

if (!storedUser) {
  alert("User not found. Please register first.");
  return;
}

const user = JSON.parse(storedUser);

if (user.usn === usn && user.password === password) {

  localStorage.setItem("logged_in_user", JSON.stringify(user));

  navigate("/dashboard");

} else {

  alert("Invalid USN or Password");

}
```

};

return (

```
<div className="flex items-center justify-center min-h-[80vh]">

  <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
      Student Login
    </h2>

    <form onSubmit={handleLogin} className="space-y-4">

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          USN
        </label>

        <input
          type="text"
          value={usn}
          onChange={(e) => setUsn(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Sign In
      </button>

    </form>

  </div>

</div>
```

);
};

export default Login;

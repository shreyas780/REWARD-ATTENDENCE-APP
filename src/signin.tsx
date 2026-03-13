import React from "react";

function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg w-80">

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Sign In
        </h2>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
          />

          <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>

      </div>
    </div>
  );
}

export default SignIn;
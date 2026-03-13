import React from "react";
import { GraduationCap } from "lucide-react";
import { Outlet } from "react-router-dom";

export default function Layout() {
return (



  <header className="p-6 text-white flex justify-between items-center">
    <div className="flex items-center gap-3">
      <GraduationCap />
      <h1 className="text-xl font-bold">Reward Attendance</h1>
    </div>

    <button className="bg-white text-black px-4 py-1 rounded">
      Sign In
    </button>
  </header>

  <main className="max-w-5xl mx-auto p-6">
    <Outlet />
  </main>

</div>

);
}
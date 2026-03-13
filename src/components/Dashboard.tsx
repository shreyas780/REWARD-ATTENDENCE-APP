// src/components/Dashboard.tsx

import React, { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Dashboard: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const storedUser = localStorage.getItem("logged_in_user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const markAttendance = async () => {

    if (!storedUser) {
      setMessage("❌ User not logged in");
      return;
    }

    const usn = user.usn;

    const now = new Date();
    const today = now.toISOString().split("T")[0];

    const docRef = doc(db, "attendance", `${usn}_${today}`);

    try {

      setLoading(true);

      const existingDoc = await getDoc(docRef);

      if (existingDoc.exists()) {
        setMessage("⚠️ Attendance already marked today");
        setLoading(false);
        return;
      }

      const hour = now.getHours();
      const minute = now.getMinutes();

      const status =
        hour < 9 || (hour === 9 && minute === 0)
          ? "early"
          : "late";

      await setDoc(docRef, {
        usn: usn,
        date: today,
        time: now.toLocaleTimeString(),
        status: status
      });

      setMessage(`✅ Attendance marked as ${status}`);

    } catch (error) {

      console.error("Firestore error:", error);
      setMessage("❌ Error marking attendance");

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Student Dashboard
      </h1>

      {/* Welcome Card */}
      {user && (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-6 mb-6 shadow-md">
          <h2 className="text-xl font-semibold">
            Welcome back, {user.usn}!
          </h2>
          <p className="text-sm opacity-90">
            Ready to track your attendance and earn rewards?
          </p>
        </div>
      )}

      {/* Action Section */}
      <div className="bg-white rounded-xl shadow-md p-6 max-w-md">

        <button
          onClick={markAttendance}
          disabled={loading}
          className="w-full px-5 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? "Marking..." : "Mark Attendance"}
        </button>

        {message && (
          <p className="mt-4 font-medium text-gray-700">
            {message}
          </p>
        )}

      </div>

    </div>
  );
};

export default Dashboard;
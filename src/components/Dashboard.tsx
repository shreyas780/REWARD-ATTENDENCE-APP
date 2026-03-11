// src/components/Dashboard.tsx
import React, { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const markAttendance = async () => {
    const storedUser = localStorage.getItem("logged_in_user");
    if (!storedUser) {
      setMessage("❌ User not logged in");
      return;
    }

    const user = JSON.parse(storedUser);
    const usn = user.usn;

    setLoading(true);
    try {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();

      // Logic: Early = before 9:00, Late = 9:00 or later
      const status = hour < 9 || (hour === 9 && minute === 0) ? "early" : "late";

      const today = now.toISOString().split("T")[0]; // YYYY-MM-DD

      await setDoc(
        doc(db, "attendance", `${usn}_${today}`),
        {
          usn,
          date: today,
          time: now.toLocaleTimeString(),
          status,
        },
        { merge: true }
      );

      setMessage(`✅ Attendance marked as ${status}`);
    } catch (error: any) {
      console.error("Error marking attendance:", error);
      setMessage("❌ Error marking attendance");
    } finally {
      setLoading(false);
    }
  };

  const storedUser = localStorage.getItem("logged_in_user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {user && <p>Welcome, {user.usn}</p>}
      <button
        onClick={markAttendance}
        disabled={loading}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
      >
        {loading ? "Marking..." : "Mark Attendance"}
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Dashboard;

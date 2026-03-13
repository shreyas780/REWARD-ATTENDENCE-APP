// src/components/Dashboard.tsx

import React, { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

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

    const now = new Date();
    const today = now.toISOString().split("T")[0];

    const docRef = doc(db, "attendance", `${usn}_${today}`);

    try {

      setLoading(true);

      // 🔹 Check if attendance already exists
      const existingDoc = await getDoc(docRef);

      if (existingDoc.exists()) {
        setMessage("⚠️ Attendance already marked today");
        setLoading(false);
        return;
      }

      const hour = now.getHours();
      const minute = now.getMinutes();

      // Early / Late logic
      const status = hour < 9 || (hour === 9 && minute === 0)
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
      setMessage("❌ Error marking attendance. Check Firebase rules.");

    } finally {
      setLoading(false);
    }
  };

  const storedUser = localStorage.getItem("logged_in_user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Dashboard
      </h1>

      {user && (
        <p className="mb-4">
          Welcome, {user.usn}
        </p>
      )}

      <button
        onClick={markAttendance}
        disabled={loading}
        className="px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
      >
        {loading ? "Marking..." : "Mark Attendance"}
      </button>

      {message && (
        <p className="mt-4 font-medium">
          {message}
        </p>
      )}

    </div>
  );
};

export default Dashboard;
import React, { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Dashboard: React.FC = () => {

const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");

const storedUser = localStorage.getItem("logged_in_user");
const user = storedUser ? JSON.parse(storedUser) : null;

const markAttendance = async () => {

if (!storedUser || !user) {
  setMessage("User not logged in");
  return;
}

const usn = user.usn;

const now = new Date();
const today = now.toISOString().split("T")[0];

const docRef = doc(db, "attendance", usn + "_" + today);

try {

  setLoading(true);

  const existingDoc = await getDoc(docRef);

  if (existingDoc.exists()) {
    setMessage("Attendance already marked today");
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

  setMessage("Attendance marked as " + status);

} catch (error) {

  console.error("Firestore error:", error);
  setMessage("Error marking attendance");

} finally {

  setLoading(false);

}

};

return (

<div className="min-h-screen bg-gray-100 py-10 px-6">

  <div className="max-w-4xl mx-auto">

    <h1 className="text-3xl font-bold text-gray-900 mb-8">
      Student Dashboard
    </h1>

    {user && (
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-6 mb-8 shadow-lg">
        <h2 className="text-xl font-semibold">
          Welcome back, {user.usn}!
        </h2>
        <p className="text-sm opacity-90 mt-1">
          Ready to track your attendance and earn rewards?
        </p>
      </div>
    )}

    <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg">

      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Mark Today's Attendance
      </h3>

      <button
        onClick={markAttendance}
        disabled={loading}
        className="w-full px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition disabled:opacity-50"
      >
        {loading ? "Marking..." : "Mark Attendance"}
      </button>

      {message && (
        <p className="mt-4 text-sm text-gray-700">
          {message}
        </p>
      )}

    </div>

  </div>

</div>

);
};

export default Dashboard;
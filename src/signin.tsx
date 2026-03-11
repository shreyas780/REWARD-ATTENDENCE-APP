import React, { useState, useEffect } from "react";
import { sendSignInLinkToEmail, signInWithEmailLink, isSignInWithEmailLink } from "firebase/auth";
import { auth } from "./firebase";

export default function SignIn() {
  const [email, setEmail] = useState("");

  // Handle link click from email
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let storedEmail = window.localStorage.getItem("emailForSignIn");
      if (!storedEmail) {
        storedEmail = window.prompt("Please provide your email for confirmation") || "";
      }
      signInWithEmailLink(auth, storedEmail, window.location.href)
        .then(() => {
          window.localStorage.removeItem("emailForSignIn");
          window.location.href = "/dashboard"; // Redirect after login
        })
        .catch((error) => {
          console.error("Error signing in with email link", error);
        });
    }
  }, []);

  // Send sign-in email
  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    const actionCodeSettings = {
      url: "https://rewardattendenceapplication.netlify.app/signin", // Must be same as Firebase redirect
      handleCodeInApp: true
    };
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
        alert("Sign-in link sent! Check your email.");
      })
      .catch((error) => {
        console.error("Error sending email link", error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Sign In via Email Link</h1>
        <form onSubmit={handleSendLink}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full mb-4 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Send Sign-In Link
          </button>
        </form>
      </div>
    </div>
  );
}

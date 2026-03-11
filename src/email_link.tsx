import React, { useEffect, useState } from "react";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from "./firebase";

export default function EmailLink() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function completeSignIn() {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem("emailForSignIn");

        if (!email) {
          email = window.prompt("Please confirm your email");
        }

        try {
          await signInWithEmailLink(auth, email!, window.location.href);
          window.localStorage.removeItem("emailForSignIn");
          setMessage("Sign-in successful! Redirecting...");
          window.location.href = "/dashboard";
        } catch (error: any) {
          setMessage(`Error: ${error.message}`);
        }
      }
    }

    completeSignIn();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Email Link Authentication</h1>
      <p>{message}</p>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function VerifyEmail() {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  const location = useLocation();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link");
      return;
    }

    fetch(`http://localhost:5000/api/auth/verify-email?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatus("success");
          setMessage(data.message);
        } else {
          setStatus("error");
          setMessage(data.message || "Verification failed");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Server error");
      });
  }, [location]);

  return (
    <>
      <Navbar />
      <div className="container text-center mt-5">
        {status === "loading" && <h3>⏳ Verifying your email...</h3>}

        {status === "success" && (
          <>
            <h2 className="text-success">✅ Email Verified!</h2>
            <p>{message}</p>
            <Link to="/login" className="btn btn-success mt-3">
              Go to Login
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-danger">❌ Verification Failed</h2>
            <p>{message}</p>
          </>
        )}
      </div>
    </>
  );
}

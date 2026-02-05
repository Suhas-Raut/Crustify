import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory(); // ✅ v5

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const json = await res.json();

    if (json.success && json.isAdmin) {
      localStorage.setItem("adminToken", json.authToken);
      localStorage.setItem("isAdmin", "true");

      history.push("/admin/dashboard"); // ✅ v5 navigation
    } else {
      alert("Admin access denied ❌");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-3 text-center">🔐 Admin Login</h2>

      <form onSubmit={login}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Admin Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-dark w-100">Login</button>
      </form>
    </div>
  );
}

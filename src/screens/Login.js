import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useHistory, Link } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("userEmail", credentials.email); 
      history.push("/");
    } else {
      alert("Invalid Credentials");
    }
  };

return (
  <div style={{ marginTop: "100px" }}>
    <Navbar />

    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="col-md-4 mx-auto">
        <h3 className="text-center mb-3">Login</h3>

        <input
          className="form-control mb-3"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={e =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />

        <input
          className="form-control mb-3"
          name="password"
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={e =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />

        <button className="btn btn-success w-100" type="submit">
          Login
        </button>

        <p className="text-center mt-3">
          New user? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  </div>
);

}

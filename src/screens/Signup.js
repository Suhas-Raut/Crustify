import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Signup() {
  const history = useHistory();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    const json = await response.json();
    if (json.success) {
      alert("Verification email sent. Please check Gmail 📩");
      history.push("/login");
    }
    else alert("Signup failed");
  };

 return (
  <div style={{ marginTop: "100px" }}>
    <Navbar />

    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="col-md-4 mx-auto">
        <h3 className="text-center mb-3">Create Account</h3>

        <input
          className="form-control mb-3"
          name="name"
          placeholder="Full Name"
          onChange={e =>
            setCredentials({ ...credentials, name: e.target.value })
          }
          required
        />

        <input
          className="form-control mb-3"
          name="email"
          placeholder="Email"
          onChange={e =>
            setCredentials({ ...credentials, email: e.target.value })
          }
          required
        />

        <input
          className="form-control mb-3"
          name="password"
          type="password"
          placeholder="Password"
          onChange={e =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          required
        />

        <button className="btn btn-success w-100" type="submit">
          Signup
        </button>

        <p className="text-center mt-3">
          Already a user? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  </div>
);

}

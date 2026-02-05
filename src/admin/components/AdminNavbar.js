import React from "react";
import { useHistory, Link } from "react-router-dom";


export default function AdminNavbar() {
const history = useHistory();

const logout = () => {
  localStorage.removeItem("adminToken");
  history.push("/admin/login");
};


  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand">🍕 Pizza Admin</span>

      <div>
      <Link to="/admin/dashboard">Dashboard</Link>
      <Link to="/admin/inventory">Inventory</Link>
      <Link to="/admin/orders">Orders</Link>

        <button onClick={logout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </nav>
  );
}

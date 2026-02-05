import React from "react";
import { useHistory, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";


export default function AdminNavbar() {
const history = useHistory();

const logout = () => {
  localStorage.removeItem("adminToken");
  history.push("/admin/login");
};


  return (
    <nav className="admin-navbar navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand">🍕 Crustify Admin</span>

      <div className="admin-right">
      <div className="admin-nav-links">
        <NavLink to="/admin/dashboard" className="admin-link">
          Dashboard
        </NavLink>

        <NavLink to="/admin/inventory" className="admin-link">
          Inventory
        </NavLink>

        <NavLink to="/admin/orders" className="admin-link">
          Orders
        </NavLink>
      </div>
        <button onClick={logout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </nav>
  );
}

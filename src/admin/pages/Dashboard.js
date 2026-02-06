import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import StatCard from "../components/StatsCard";

export default function Dashboard() {
  const [stats, setStats] = useState({
    orders: 0,
    revenue: 0,
    lowStock: 0
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/stats", {
      headers: {
        "auth-token": localStorage.getItem("adminToken")
      }
    })
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="container mt-4">
        <h2 className="admin-h">📊 Admin Dashboard</h2>

        <div className="row mt-4">
          <StatCard title="Total Orders" value={stats.orders} icon="📦" />
          <StatCard title="Revenue (₹)" value={stats.revenue} icon="💰" />
          <StatCard title="Low Stock Items" value={stats.lowStock} icon="⚠️" />
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/orders", {
      headers: {
        "auth-token": localStorage.getItem("adminToken")
      }
    })
      .then(res => res.json())
      .then(data => {
  if (Array.isArray(data)) {
    setOrders(data);
  } else if (Array.isArray(data.orders)) {
    setOrders(data.orders);
  } else {
    setOrders([]);
  }
});
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/admin/order/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("adminToken")
      },
      body: JSON.stringify({ status })
    });

    alert("Order status updated 🔄");
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mt-4">
        <h2 className="admin-h">📋 Orders</h2>

        {Array.isArray(orders) && orders.map(order => (
          <div key={order._id} className="card mb-3 p-3">
            <h5>{order.userEmail}</h5>
            <p>Status: <b>{order.status}</b></p>

            <select
              className="form-select"
              onChange={(e) => updateStatus(order._id, e.target.value)}
            >
              <option>Order Received</option>
              <option>In Kitchen</option>
              <option>Sent to Delivery</option>
            </select>
          </div>
        ))}
      </div>
    </>
  );
}

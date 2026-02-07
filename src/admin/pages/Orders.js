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
        if (data.success && Array.isArray(data.orders)) {
          setOrders(data.orders);
        }
      });
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="container mt-4">
        <h2>📦 All Orders (Admin)</h2>

        {orders.map((user, uIndex) => (
          <div key={uIndex} className="mb-5 border p-3">
            <h5>📧 {user.email}</h5>

            {user.order_data
              .slice(0)
              .reverse()
              .map((order, oIndex) => (
                <div key={oIndex} className="mt-3">
                  {order.map((item, i) => {
                    if (item.Order_date) {
                      return (
                        <h6 key={i} className="mt-3">
                          🗓 {item.Order_date}
                        </h6>
                      );
                    }

                    return (
                      <div key={i} className="ps-3">
                        • {item.name} × {item.qty} — ₹{item.price}
                      </div>
                    );
                  })}
                </div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
}

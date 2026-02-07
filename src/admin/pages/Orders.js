import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import "./Orders.css";

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
        if (data.success) setOrders(data.orders);
      });
  }, []);

  const updateStatus = async (email, index, status) => {
    await fetch("http://localhost:5000/api/admin/order-status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("adminToken")
      },
      body: JSON.stringify({
        userEmail: email,
        orderIndex: index,
        status
      })
    });

    alert(`Order marked as "${status}"`);
    window.location.reload();
  };

  return (
    <>
      <AdminNavbar />

      <div className="adminOrdersPage">
        <h2 className="adminOrdersTitle">📦 Admin Orders</h2>

        <div className="adminOrdersGrid">
          {orders.map((user, uIndex) =>
            user.order_data
              .slice(0)
              .reverse()
              .map((order, oIndex) => {
                const meta = order[0];
                const status = meta.status || "Placed";

                return (
                  <div
                    key={`${uIndex}-${oIndex}`}
                    className="adminOrderCard glassCard"
                  >
                    {/* HEADER */}
                    <div className="orderHeader">
                      <span className="orderEmail">📧 {user.email}</span>
                      <span className={`orderStatus status-${status.replaceAll(" ", "").toLowerCase()}`}>
                        {status}
                      </span>
                    </div>

                    <div className="orderDate">🗓 {meta.Order_date}</div>

                    {/* ITEMS */}
                    <div className="orderItems">
                      {order.slice(1).map((item, i) => (
                        <div key={i} className="orderItem">
                          <span>{item.name}</span>
                          <span>x{item.qty}</span>
                          <span>₹{item.price}</span>
                        </div>
                      ))}
                    </div>

                    {/* ACTIONS */}
                    <div className="orderActions">
                      {status === "Placed" && (
                        <button
                          className="orderBtn warningBtn"
                          onClick={() =>
                            updateStatus(user.email, oIndex, "In Kitchen")
                          }
                        >
                          🍳 Send to Kitchen
                        </button>
                      )}

                      {status === "In Kitchen" && (
                        <button
                          className="orderBtn successBtn"
                          onClick={() =>
                            updateStatus(
                              user.email,
                              oIndex,
                              "Out for Delivery"
                            )
                          }
                        >
                          🚚 Out for Delivery
                        </button>
                      )}

                      {status === "Out for Delivery" && (
                        <div className="deliveredBadge">
                          ✅ Delivered
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>
    </>
  );
}

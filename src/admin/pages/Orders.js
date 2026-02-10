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

  const updateStatus = async (email, orderId, status) => {
    await fetch("http://localhost:5000/api/admin/order-status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("adminToken")
      },
      body: JSON.stringify({
        userEmail: email,
        orderId,
        status
      })
    });

   setOrders(prev =>
  prev.map(u =>
    u.email === email
      ? {
          ...u,
          order_data: u.order_data.map(order =>
            order[0].orderId === orderId
              ? [{ ...order[0], status }, ...order.slice(1)]
              : order
          )
        }
      : u
  )
);

  }; // ✅ THIS WAS MISSING

  return (
    <>
      <AdminNavbar />

      <div className="adminOrdersPage">
        <h2 className="adminOrdersTitle">📦 Admin Orders</h2>

        <div className="adminOrdersGrid">
          {orders.map(user =>
            (user.order_data || [])
              .slice()
              .reverse()
              .map(order => {
                if (!Array.isArray(order)) return null;

                const meta = order[0];
                const orderId = meta.orderId;
                const items = order.slice(1);
                const status = meta.status || "Placed";

                return (
                  <div key={meta.id} className="adminOrderCard glassCard">
                    <div className="orderHeader">
                      <span className="orderEmail">📧 {user.email}</span>
                      <span className={`orderStatus status-${status.replaceAll(" ", "").toLowerCase()}`}>
                        {status}
                      </span>
                    </div>

                    <div className="orderMetaRow">
                      <div className="orderDate">🗓 {meta.Order_date}</div>

                      <div className="orderActions">
                        {status === "Placed" && (
                          <button
                            className="orderBtn warningBtn"
                            onClick={() => updateStatus(user.email, orderId, "In Kitchen")}
                          >
                            🍳 In Kitchen
                          </button>
                        )}

                        {status === "In Kitchen" && (
                          <button
                            className="orderBtn successBtn"
                            onClick={() => updateStatus(user.email, orderId, "Out for Delivery")}
                          >
                            🚚 Out for Delivery
                          </button>
                        )}

                        {status === "Out for Delivery" && (
                          <div className="deliveredBadge">✅ Delivered</div>
                        )}
                      </div>
                    </div>

                    <div className="orderItems">
                      {items.map((item, i) => (
                        <div key={i} className="orderItem">
                          <span>{item.name}</span>
                          <span>x{item.qty}</span>
                          <span>₹{item.price}</span>
                        </div>
                      ))}
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

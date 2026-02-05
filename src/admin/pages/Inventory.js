import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

export default function Inventory() {
  const [inventory, setInventory] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/inventory", {
      headers: {
        "auth-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => setInventory(data));
  }, []);

  const saveInventory = async () => {
    await fetch("http://localhost:5000/api/admin/inventory", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify(inventory)
    });

    alert("Inventory updated ✅");
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mt-4">
        <h2>📦 Inventory</h2>

        {Object.keys(inventory).map(key =>
          !["_id", "__v"].includes(key) && (
            <div key={key} className="mb-3">
              <label>{key.toUpperCase()}</label>
              <input
                type="number"
                className="form-control"
                value={inventory[key]}
                onChange={(e) =>
                  setInventory({ ...inventory, [key]: e.target.value })
                }
              />
            </div>
          )
        )}

        <button className="btn btn-success" onClick={saveInventory}>
          Save Changes
        </button>
      </div>
    </>
  );
}

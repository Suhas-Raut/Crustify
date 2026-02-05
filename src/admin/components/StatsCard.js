import React from "react";

export default function StatCard({ title, value, icon }) {
  return (
    <div className="col-md-4 mb-3">
      <div className="card shadow-sm p-3 text-center">
        <h3>{icon}</h3>
        <h5>{title}</h5>
        <h2>{value}</h2>
      </div>
    </div>
  );
}

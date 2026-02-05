import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function AdminRoutes({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const isAdmin = localStorage.getItem("isAdmin");
        return isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/admin/login" />
        );
      }}
    />
  );
}

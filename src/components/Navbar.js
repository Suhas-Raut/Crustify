import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom"; // useHistory is correct for v5
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const history = useHistory(); // correct for v5
  const items = useCart();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    history.push("/login"); // useHistory uses push
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success position-fixed w-100" style={{ zIndex: 10 }}>
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">CRUSTIFY</Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link fs-5 mx-3 active" to="/">Home</Link>
            </li>
            {localStorage.getItem("token") && (
              <li className="nav-item">
                <Link className="nav-link fs-5 mx-3 active" to="/myorder">My Orders</Link>
              </li>
            )}
          </ul>

          
            {/* CART — ALWAYS VISIBLE */}
<button
  className="btn bg-white text-success mx-2"
  onClick={() => setCartView(true)}
>
  <Badge color="secondary" badgeContent={items?.length || 0}>
    <ShoppingCartIcon />
  </Badge>
  Cart
</button>

{cartView && (
  <Modal onClose={() => setCartView(false)}>
    <Cart />
  </Modal>
)}

{/* AUTH BUTTONS */}
{!localStorage.getItem("token") ? (
  <>
    <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
    <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
  </>
) : (
  <button onClick={handleLogout} className="btn bg-white text-success">
    Logout
  </button>
)}


        </div>
      </div>
    </nav>
  );
}

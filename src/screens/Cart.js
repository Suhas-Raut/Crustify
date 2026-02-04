import React from "react";
import Delete from "@material-ui/icons/Delete";
import { useCart, useDispatchCart } from "../components/ContextReducer";

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className="m-5 white text-center fs-3">
        Your Cart is Empty 🛒
      </div>
    );
  }

  const totalPrice = data.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

const handleCheckOut = async () => {
  try {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("userEmail");

    if (!token || !userEmail) {
      alert("Please login to place order");
      return;
    }

    const response = await fetch(
      "http://localhost:5000/api/auth/orderData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        },
        body: JSON.stringify({
          email: userEmail,
          order_data: data,
          order_date: new Date().toDateString()
        })
      }
    );

    const result = await response.json();

    if (response.ok && result.success) {
      dispatch({ type: "DROP" });
      alert("Order placed successfully 🍕");
    } else {
      alert("Order failed");
    }
  } catch (error) {
    console.error("Checkout Error:", error);
    alert("Checkout failed. Backend not reachable.");
  }
};

const handlePayment = async () => {
   console.log("🔥 Pay button clicked");
  const res = await fetch(
    "http://localhost:5000/api/payment/create-order",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalPrice })
    }
  );

  const order = await res.json();

  const options = {
    key: "rzp_test_SC1JOGqcbdca2D", // TEST KEY ID
    amount: order.amount,
    currency: "INR",
    name: "Food App",
    description: "Test Transaction",
    order_id: order.id,

    handler: async function (response) {
      // ✅ PAYMENT SUCCESS
      await handleCheckOut(); // your existing order function
      alert("Payment Successful 🎉");
    },

    theme: {
      color: "#3399cc"
    }
  };

  const razor = new window.Razorpay(options);
  razor.open();
};



  return (
    <div className="container mt-5">
      <table className="table table-hover">
        <thead className="fs-4">
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Details</th>
            <th>Qty</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>

              <td>
                <strong>{item.name}</strong>
                <div style={{ fontSize: "12px", color: "#777" }}>
                  {item.category}
                </div>
              </td>

              <td style={{ fontSize: "13px" }}>
                {item.type === "custom" ? (
                  <>
                    <div>🍞 Base: {item.customization.base}</div>
                    <div>🥫 Sauce: {item.customization.sauce}</div>
                    <div>🧀 Cheese: {item.customization.cheese}</div>

                    {item.customization.vegToppings.length > 0 && (
                      <div>
                        🌱 Veg:{" "}
                        {item.customization.vegToppings.join(", ")}
                      </div>
                    )}

                    {item.customization.nonVegToppings.length > 0 && (
                      <div>
                        🍗 Non-Veg:{" "}
                        {item.customization.nonVegToppings.join(", ")}
                      </div>
                    )}
                  </>
                ) : (
                  <span>Standard Item</span>
                )}
              </td>

              <td>{item.qty}</td>
              <td>₹{item.price}</td>

              <td>
                <button
                  className="btn p-0"
                  onClick={() =>
                    dispatch({ type: "REMOVE", index })
                  }
                >
                  <Delete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="mt-4">Total: ₹{totalPrice}</h3>

      <button
        className="btn btn-primary mt-3"
        onClick={handlePayment}
      >
        Pay ₹{totalPrice}
      </button>

    </div>
  );
}

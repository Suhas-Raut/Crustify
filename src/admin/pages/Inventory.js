import React, { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

export default function Inventory() {

const [customFilter, setCustomFilter] = useState("base");


const inventoryData = {
  // ================= CUSTOM PIZZA =================
  "Custom Pizza": [
  // Bases
  { name: "Classic Hand Tossed Base", type: "veg", subCategory: "base" },
  { name: "Thin Crust Base", type: "veg", subCategory: "base" },
  { name: "Cheese Burst Base", type: "veg", subCategory: "base" },
  { name: "Whole Wheat Base", type: "veg", subCategory: "base" },
  { name: "Fresh Pan Base", type: "veg", subCategory: "base" },

  // Sauces
  { name: "Classic Tomato Sauce", type: "veg", subCategory: "sauce" },
  { name: "BBQ Sauce", type: "veg", subCategory: "sauce" },
  { name: "Peri Peri Sauce", type: "veg", subCategory: "sauce" },
  { name: "White Garlic Sauce", type: "veg", subCategory: "sauce" },
  { name: "Pesto Sauce", type: "veg", subCategory: "sauce" },

  // Cheese
  { name: "Mozzarella Cheese", type: "veg", subCategory: "cheese" },
  { name: "Cheddar Cheese", type: "veg", subCategory: "cheese" },
  { name: "Parmesan Cheese", type: "veg", subCategory: "cheese" },
  { name: "Vegan Cheese", type: "veg", subCategory: "cheese" },

  // Veg Toppings
  { name: "Onion", type: "veg", subCategory: "vegTopping" },
  { name: "Capsicum", type: "veg", subCategory: "vegTopping" },
  { name: "Tomato", type: "veg", subCategory: "vegTopping" },
  { name: "Golden Corn", type: "veg", subCategory: "vegTopping" },
  { name: "Black Olives", type: "veg", subCategory: "vegTopping" },
  { name: "Spicy Jalapeno", type: "veg", subCategory: "vegTopping" },
  { name: "Red Paprika", type: "veg", subCategory: "vegTopping" },

  // Non-Veg Toppings
  { name: "Herb Grilled Chicken", type: "nonveg", subCategory: "nonVegTopping" },
  { name: "Spicy Peri Peri Chicken", type: "nonveg", subCategory: "nonVegTopping" },
  { name: "Smokey BBQ Chicken", type: "nonveg", subCategory: "nonVegTopping" },
  { name: "Roast Chicken", type: "nonveg", subCategory: "nonVegTopping" },
  { name: "Chicken Tikka", type: "nonveg", subCategory: "nonVegTopping" }
],


  // ================= PIZZAS (20) =================
  Pizza: [
    { name: "Margherita Pizza", type: "veg" },
    { name: "Pepperoni Pizza", type: "veg" },
    { name: "Veggie Delight", type: "veg" },
    { name: "Corn N Cheese Pizza", type: "veg" },
    { name: "Chilli Cheese Burst Pizza", type: "veg" },
    { name: "Cheese Burst Pizza", type: "veg" },
    { name: "Italian Fiesta Pizza", type: "veg" },
    { name: "Veggie Punch Pizza", type: "veg" },
    { name: "Paneer Tikka Pizza", type: "veg" },
    { name: "Paneer Tikka Max Pizza", type: "veg" },
    { name: "Paneer Tikka Juicy Pizza", type: "veg" },
    { name: "Peri Peri Paneer Pizza", type: "veg" },

    { name: "BBQ Chicken Pizza", type: "nonveg" },
    { name: "Chicken Corn Pizza", type: "nonveg" },
    { name: "Spicy Chicken Pizza", type: "nonveg" },
    { name: "Smoky BBQ Chicken Pizza", type: "nonveg" },
    { name: "Chicken Italiana Pizza", type: "nonveg" },
    { name: "Double Tossed Chicken Pizza", type: "nonveg" },
    { name: "Butter Chicken Pizza", type: "nonveg" },
    { name: "Peri Peri Chicken Pizza", type: "nonveg" }
  ],

  // ================= BURGERS =================
  Burgers: [
    { name: "Cheese Burger", type: "veg" },
    { name: "Veg Burger", type: "veg" },
    { name: "Chicken Burger", type: "nonveg" },
    { name: "Double Decker Chicken Burger", type: "nonveg" }
  ],

  // ================= PASTRIES =================
  Pastries: [
    { name: "Choco Lava Cake", type: "veg" },
    { name: "Choco Overload Cake", type: "veg" },
    { name: "Chocolate Ice Cream", type: "veg" },
    { name: "Croissant", type: "veg" },
    { name: "Chocolate Pastry", type: "veg" },
    { name: "Cupcake", type: "veg" },
    { name: "Strawberry Tart", type: "veg" },
    { name: "Blueberry Muffin", type: "veg" }
  ],

  // ================= BEVERAGES =================
  Beverages: [
    { name: "Coca Cola", type: "veg" },
    { name: "Orange Juice", type: "veg" },
    { name: "Cold Coffee", type: "veg" },
    { name: "Cold Coffee Milk", type: "veg" },
    { name: "Green Tea", type: "veg" },
    { name: "Lemonade", type: "veg" },
    { name: "Rooh Afza", type: "veg" },
    { name: "Blue Ocean Soda", type: "veg" }
  ]
};


  const [stock, setStock] = useState({});

  const handleChange = (item, value) => {
    setStock(prev => ({
      ...prev,
      [item]: Number(value)
    }));
  };

  const saveInventory = () => {
    console.log("Inventory Saved:", stock);
    alert("Inventory saved ✅ (frontend test)");
  };


  
  return (
    <>
      <AdminNavbar />

      <div className="container mt-4">
        <h2 className="admin-h mb-4">📦 Inventory Management</h2>

        {Object.entries(inventoryData).map(([category, items]) => (
          <div key={category} className="mb-5">

  <h4 className="admin-h mb-3 d-flex justify-content-between align-items-center">
    {category}

    {category === "Custom Pizza" && (
      <div className="btn-group">
        <button
          className="btn btn-sm btn-outline-light"
          onClick={() => setCustomFilter("base")}
        >
          Base
        </button>
        <button
          className="btn btn-sm btn-outline-light"
          onClick={() => setCustomFilter("sauce")}
        >
          Sauce
        </button>
        <button
          className="btn btn-sm btn-outline-light"
          onClick={() => setCustomFilter("cheese")}
        >
          Cheese
        </button>
        <button
          className="btn btn-sm btn-outline-success"
          onClick={() => setCustomFilter("vegTopping")}
        >
          Veg
        </button>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => setCustomFilter("nonVegTopping")}
        >
          Non-Veg
        </button>
      </div>
    )}
  </h4>

  <hr />


            <div className="row">
              {(category === "Custom Pizza"
                ? items.filter(i => i.subCategory === customFilter)
                : items
              ).map((item, idx) => (
                <div key={idx} className="col-12 col-md-6 col-lg-3 mb-4">
                  <div className="glass-card p-3 h-100">

                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="admin-h mb-0">{item.name}</h6>
                      <span
                        className={`badge ${
                          item.type === "veg"
                            ? "badge-veg"
                            : "badge-nonveg"
                        }`}
                      >
                        {item.type === "veg" ? "🟢 Veg" : "🔴 Non-Veg"}
                      </span>
                    </div>

                    <label className="admin-h form-label mt-2">
                      Stock Quantity
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter stock"
                      value={stock[item.name] || ""}
                      onChange={(e) =>
                        handleChange(item.name, e.target.value)
                      }
                    />

                    <button className="btn btn-outline-light btn-sm w-100 mt-3">
                      ➕ Add Stock
                    </button>

                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          className="btn btn-success w-100 mt-4 mb-5"
          onClick={saveInventory}
        >
          💾 Save Inventory
        </button>
      </div>
    </>
  );
}

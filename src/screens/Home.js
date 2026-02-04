import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import FoodCarousel from "../components/FoodCarousel"
import offers from "../data/offers"
import vegPizza from "../components/Images/VegPizza.png";
import NonvegPizza from "../components/Images/NonvegPizza.png"
import { useDispatchCart } from "../components/ContextReducer";


export default function Home() {
  const [foodCat, setFoodCat] = useState([])
  const [foodItems, setFoodItems] = useState([])
  const [search, setSearch] = useState('')
  const [showCustomPizza, setShowCustomPizza] = useState(false)
  const [pizzaType, setPizzaType] = useState("veg")
  const [cursorText, setCursorText] = useState("BUILD PIZZA • VIEW DETAILS •")
  const [cursorType, setCursorType] = useState("veg")
  const dispatch = useDispatchCart();
  // --- Custom Pizza States ---
const [selectedBase, setSelectedBase] = useState("Classic Hand Tossed");
const [selectedSauce, setSelectedSauce] = useState("Classic Tomato");
const [selectedCheese, setSelectedCheese] = useState("Mozzarella");

const [vegToppings, setVegToppings] = useState([]);
const [nonVegToppings, setNonVegToppings] = useState([]);






  // Dummy Categories
  const dummyCategories = [
    { id: 1, CategoryName: "Pizza" },
    { id: 2, CategoryName: "Burgers" },
    { id: 3, CategoryName: "Pastries" },
    { id: 4, CategoryName: "Beverages" }
  ]

  // Dummy Items
  const dummyItems = [
    // --- Pizzas ---
    { id: 101, name: "Margherita Pizza", type: "veg", CategoryName: "Pizza", options: [{ Small: 199, Medium: 299, Large: 399 }], img: "https://assets.box8.co.in/rectangle-19x10/xhdpi/product/910" },
    { id: 102, name: "Pepperoni Pizza",type: "veg", CategoryName: "Pizza", options: [{ Small: 249, Medium: 399, Large: 549 }], img: "https://assets.box8.co.in/rectangle-19x10/xhdpi/product/910" },
    { id: 103, name: "Veggie Delight",type: "veg", CategoryName: "Pizza", options: [{ Small: 229, Medium: 349, Large: 499 }], img: "https://assets.box8.co.in/rectangle-19x10/xhdpi/product/910" },
    { id: 104, name: "Corn N Cheese Pizza",type: "veg", CategoryName: "Pizza", options: [{ Small: 239, Medium: 359, Large: 509 }], img: "https://assets.box8.co.in/rectangle-19x10/xhdpi/product/910" },
    { id: 105, name: "Chilli Cheese Burst Pizza",type: "veg", CategoryName: "Pizza", options: [{ Small: 289, Medium: 439, Large: 589 }], img: "" },
    { id: 106, name: "Cheese Burst Pizza",type: "veg", CategoryName: "Pizza", options: [{ Small: 279, Medium: 429, Large: 579 }], img: "" },
    { id: 107, name: "Italian Fiesta Pizza",type: "veg", CategoryName: "Pizza", options: [{ Small: 259, Medium: 399, Large: 549 }], img: "" },
    { id: 108, name: "Veggie Punch Pizza",type: "veg", CategoryName: "Pizza", options: [{ Small: 249, Medium: 389, Large: 529 }], img: "" },
    { id: 109, name: "Paneer Tikka Pizza",type: "veg", CategoryName: "Pizza", options: [{ Small: 299, Medium: 449, Large: 599 }], img: "" },
    { id: 110, name: "Paneer Tikka Max Pizza",type: "veg", CategoryName: "Pizza", options: [{ Small: 319, Medium: 479, Large: 629 }], img: "" },
    { id: 111, name: "Paneer Tikka Juicy Pizza",type: "veg", CategoryName: "Pizza", options: [{ Small: 329, Medium: 489, Large: 639 }], img: "" },
    { id: 112, name: "Peri Peri Paneer Pizza",type: "veg", CategoryName: "Pizza", options: [{ Small: 309, Medium: 469, Large: 619 }], img: "" },
    { id: 113, name: "BBQ Chicken Pizza",type: "nonveg", CategoryName: "Pizza", options: [{ Small: 299, Medium: 449, Large: 599 }], img: "" },
    { id: 114, name: "Chicken Corn Pizza",type: "nonveg", CategoryName: "Pizza", options: [{ Small: 289, Medium: 439, Large: 589 }], img: "" },
    { id: 115, name: "Spicy Chicken Pizza",type: "nonveg", CategoryName: "Pizza", options: [{ Small: 309, Medium: 459, Large: 609 }], img: "" },
    { id: 116, name: "Smoky BBQ Chicken Pizza",type: "nonveg", CategoryName: "Pizza", options: [{ Small: 319, Medium: 479, Large: 629 }], img: "" },
    { id: 117, name: "Chicken Italiana Pizza", type: "nonveg", CategoryName: "Pizza", options: [{ Small: 329, Medium: 489, Large: 639 }], img: "" },
    { id: 118, name: "Double Tossed Chicken Pizza", type: "nonveg", CategoryName: "Pizza", options: [{ Small: 349, Medium: 509, Large: 659 }], img: "" },
    { id: 119, name: "Butter Chicken Pizza", type: "nonveg", CategoryName: "Pizza", options: [{ Small: 339, Medium: 499, Large: 649 }], img: "" },
    { id: 120, name: "Peri Peri Chicken Pizza", type: "nonveg", CategoryName: "Pizza", options: [{ Small: 329, Medium: 489, Large: 639 }], img: "" },
    // --- Burgers ---
    { id: 201, name: "Cheese Burger",type: "veg", CategoryName: "Burgers", options: [{ Small: 99, Medium: 149, Large: 199 }], img: "https://assets.box8.co.in/rectangle-19x10/xhdpi/product/1586" },
    { id: 202, name: "Veg Burger",type: "veg", CategoryName: "Burgers", options: [{ Small: 79, Medium: 129, Large: 179 }], img: "https://assets.box8.co.in/rectangle-19x10/xhdpi/product/1586" },
    { id: 203, name: "Chicken Burger",type: "nonveg", CategoryName: "Burgers", options: [{ Small: 119, Medium: 169, Large: 219 }], img: "https://assets.box8.co.in/rectangle-19x10/xhdpi/product/1586" },
    { id: 204, name: "Double Decker Chicken Burger",type: "nonveg", CategoryName: "Burgers", options: [{ Small: 149, Medium: 199, Large: 249 }], img: "https://assets.box8.co.in/rectangle-19x10/xhdpi/product/1586" },

    // --- Pastries ---
    { id: 301, name: "Choco Lava Cake",type: "veg", CategoryName: "Pastries", options: [{ Regular: 70, Large: 110 }], img: "https://assets.box8.co.in/rectangle-19x10/xhdpi/product/671" },
    { id: 302, name: "Choco Overload Cake",type: "veg", CategoryName: "Pastries", options: [{ Regular: 50, Large: 90 }], img: "https://assets.box8.co.in/rectangle-19x10/xhdpi/product/671" },
    { id: 303, name: "Chocolate Ice Cream",type: "veg", CategoryName: "Pastries", options: [{ Regular: 55, Large: 95 }], img: "https://assets.box8.co.in/rectangle-19x10/xhdpi/product/671" },
    { id: 304, name: "Croissant",type: "veg", CategoryName: "Pastries", options: [{ Regular: 50, Large: 90 }], img: "https://assets.box8.co.in/rectangle-19x10/xhdpi/product/671" },
    { id: 305, name: "Chocolate Pastry",type: "veg", CategoryName: "Pastries", options: [{ Regular: 60, Large: 100 }], img: "https://assets.box8.co.in/rectangle-19x10/xhdpi/product/671" },
    { id: 306, name: "Cupcake",type: "veg", CategoryName: "Pastries", options: [{ Regular: 55, Large: 95 }], img: "https://assets.box8.co.in/rectangle-19x10/xhdpi/product/671" },
    { id: 307, name: "Strawberry Tart",type: "veg", CategoryName: "Pastries", options: [{ Regular: 70, Large: 110 }], img: "https://assets.box8.co.in/rectangle-19x10/xhdpi/product/671" },
    { id: 308, name: "Blueberry Muffin",type: "veg", CategoryName: "Pastries", options: [{ Regular: 55, Large: 95 }], img: "https://assets.box8.co.in/rectangle-19x10/xhdpi/product/671" },

    // --- Beverages ---
    { id: 401, name: "Coca Cola",type: "veg", CategoryName: "Beverages", options: [{ Bottle: 50, Can: 100 }], img: "https://assets.box8.co.in/rectangle-19x10/xhdpi/product/9234" },
    { id: 402, name: "Orange Juice",type: "veg", CategoryName: "Beverages", options: [{ Glass: 40, Large: 70 }], img: "https://assets.box8.co.in/rectangle-19x10/xhdpi/product/9234" },
    { id: 403, name: "Cold Coffee",type: "veg", CategoryName: "Beverages", options: [{ Small: 50, Medium: 80, Large: 120 }], img: "https://assets.box8.co.in/rectangle-19x10/xhdpi/product/9234" },
    { id: 404, name: "Cold Coffee Milk",type: "veg", CategoryName: "Beverages", options: [{ Small: 60, Medium: 90, Large: 130 }], img: "https://assets.box8.co.in/rectangle-19x10/xhdpi/product/9234" },
    { id: 405, name: "Green Tea",type: "veg", CategoryName: "Beverages", options: [{ Cup: 50, Pot: 80 }], img: "https://assets.box8.co.in/rectangle-19x10/xhdpi/product/9234" },
    { id: 406, name: "Lemonade",type: "veg", CategoryName: "Beverages", options: [{ Glass: 35, Large: 60 }], img: "https://assets.box8.co.in/rectangle-19x10/xhdpi/product/9234" },
    { id: 407, name: "Rooh Afza",type: "veg", CategoryName: "Beverages", options: [{ Glass: 40, Large: 70 }], img: "https://assets.box8.co.in/rectangle-19x10/xhdpi/product/9234" },
    { id: 408, name: "Blue Ocean Soda",type: "veg", CategoryName: "Beverages", options: [{ Glass: 50, Large: 90 }], img: "https://assets.box8.co.in/rectangle-19x10/xhdpi/product/9234" },
  ]

  // Load food items from backend or fallback to dummy data
  const loadFoodItems = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/auth/foodData", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      response = await response.json()
      setFoodItems(response[0].length ? response[0] : dummyItems)
      setFoodCat(response[1].length ? response[1] : dummyCategories)
    } catch (error) {
      console.error("Error fetching food data, using dummy data", error)
      setFoodItems(dummyItems)
      setFoodCat(dummyCategories)
    }
  }

  useEffect(() => {
  loadFoodItems()
}, [])

  useEffect(() => {
    const cursor = document.getElementById("viewCursor")

    const move = (e) => {
      if (!cursor) return
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
    }

    document.addEventListener("mousemove", move)

    return () => document.removeEventListener("mousemove", move)
  }, [])

  const handleAddCustomPizza = () => {
  dispatch({
    type: "ADD",
    item: {
      id: Date.now(),
      name: pizzaType === "veg"
        ? "Veg Custom Pizza 🍕"
        : "Non-Veg Custom Pizza 🍕",
      image: pizzaType === "veg" ? vegPizza : NonvegPizza,
      category: "Custom Pizza",
      qty: 1,
      size: "Regular",
      price: 299,
      type: "custom",
      customization: {
        base: selectedBase,
        sauce: selectedSauce,
        cheese: selectedCheese,
        vegToppings,
        nonVegToppings
      }
    }
  });

  setShowCustomPizza(false);
};




  return (
    <div>
      <Navbar />

      <div className='container mt-3'>

        {/* --- Offers Carousel --- */}
        <div className="mb-5">
          <h3>Current Offers</h3>
          <hr style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(225, 255, 0),rgb(240, 33, 33))" }} />
          <FoodCarousel items={offers} />
        </div>

        {/* --- Custom Pizza Choice Section --- */}
<div className="mb-5">
  <h2 className="tee">Build Your Own Pizza 🍕</h2>
  <p className="teee">
    Your pizza, your rules! Choose veg or non-veg and customize it your way.
  </p>
  <hr style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(225, 255, 0),rgb(240, 33, 33))" }} />


        <div className="row mt-4">
  {/* VEG CARD */}
  <div className="col-md-6 mb-3">
   <div
  className="p-4 rounded shadow work-item pizza-card"
  style={{ cursor: "none", background: "#e8ffe8", textAlign: "center" }}
  onClick={() => {
    setPizzaType("veg")
    setShowCustomPizza(true)
  }}
  onMouseEnter={() => {
    setCursorText("BUILD VEG PIZZA • FRESH AND GREEN •")
    setCursorType("veg")
    document.getElementById("viewCursor")?.classList.add("show")
  }}
  onMouseLeave={() =>
    document.getElementById("viewCursor")?.classList.remove("show")
  }
>




      <img
        src={vegPizza}
        alt="Veg Pizza"
        style={{
          width: "100%",
          marginBottom: "12px"
        }}
      />
      <h4>🟢 Veg Custom Pizza</h4>
      <p className='mar'>Create a fully vegetarian pizza just the way you like it.</p>
    </div>
  </div>

  {/* NON-VEG CARD */}
  <div className="col-md-6 mb-3">
   <div
  className="p-4 rounded shadow work-item pizza-card"
  style={{ cursor: "none", background: "#ffe8e8", textAlign: "center" }}
  onClick={() => {
    setPizzaType("nonveg")
    setShowCustomPizza(true)
  }}
  onMouseEnter={() => {
    setCursorText("BUILD NON-VEG PIZZA • MEATY & BOLD •")
    setCursorType("nonveg")
    document.getElementById("viewCursor")?.classList.add("show")
  }}
  onMouseLeave={() =>
    document.getElementById("viewCursor")?.classList.remove("show")
  }
>




      <img
        src={NonvegPizza}
        alt="Non Veg Pizza"
        style={{
          width: "100%",
          marginBottom: "12px"
        }}
      />
      <h4>🔴 Non-Veg Custom Pizza</h4>
      <p className="mar">Loaded with chicken & meat toppings of your choice.</p>
    </div>
  </div>
</div>
</div>

        
        {/* --- Categories Section --- */}
        {foodCat.map((data) => (
          <div key={data.id} className='mb-5'>
            <h3>{data.CategoryName} 🍕</h3>
            <hr style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(242, 255, 0),rgb(255, 0, 0))" }} />
            <div className='row'>
              {foodItems
                .filter(item => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                .map(filterItems => (
                  <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                    <Card
                      foodName={filterItems.name}
                      item={filterItems}
                      options={filterItems.options[0]}
                      ImgSrc={filterItems.img}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}

      </div>
      {showCustomPizza && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.7)",
      zIndex: 9999,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        width: "95%",
        maxWidth: "1300px",
        background: "#ffffff",
        borderRadius: "12px",
        padding: "20px",
        position: "relative",
      }}
    >
      {/* ❌ CLOSE */}
      <button
        onClick={() => setShowCustomPizza(false)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          border: "none",
          background: "transparent",
          fontSize: "22px",
          cursor: "pointer",
        }}
      >
        ❌
      </button>

      <div className="row">
        {/* LEFT SIDE — IMAGE + PRICE */}
        <div className="col-md-5 text-center">
         <img
  src={pizzaType === "veg" ? vegPizza : NonvegPizza}
  alt="Custom Pizza"
  style={{width: "100%", maxWidth: "560px", paddingTop: "8px"}}
/>


          <h4 className="mt-3">
            {pizzaType === "veg" ? "Veg Custom Pizza" : "Non-Veg Custom Pizza"}
          </h4>
<p style={{ color: "#555", fontSize: "14px", marginTop: "4px" }}>
  {pizzaType === "veg"
    ? (<>Fresh, colorful, and 100% vegetarian goodness 🌱🍕 <br /> Pick Load your pizza with crunchy onions, juicy tomatoes, capsicum, golden corn, olives, and spicy jalapeños 🫑🍅🌽
  <br /> Every bite delivers a balance of melted cheeserich sauces, and garden-fresh toppings</>)
    : (<>A power-packed pizza experience made for true meat lovers 🍗🔥🍕<br />
  Bold, smoky, and irresistibly juicy in every bite. Choose from herb-grilled chicken, peri-peri spice, 
  BBQ chicken, roast chicken, or classic chicken tikka 🤤🔥<br /></>)}
</p>



          <h3 style={{ color: "#e63946" }}>₹299</h3>
        </div>

        {/* RIGHT SIDE — OPTIONS */}
        <div className="col-md-7">
          <h3 className="tee2">Build Your Own Pizza 🍕</h3>
          <hr />

          <h5>Choose Pizza Base</h5>
          <select
              className="form-select mb-3"
              value={selectedBase}
              onChange={(e) => setSelectedBase(e.target.value)}
          >
            <option>Classic Hand Tossed</option>
            <option>Thin Crust</option>
            <option>Cheese Burst</option>
            <option>Whole Wheat</option>
            <option>Fresh Pan</option>
          </select>

          <h5>Choose Sauce</h5>
          <select
              className="form-select mb-3"
              value={selectedSauce}
              onChange={(e) => setSelectedSauce(e.target.value)}
          >
            <option>Classic Tomato</option>
            <option>BBQ Sauce</option>
            <option>Peri Peri</option>
            <option>White Garlic</option>
            <option>Pesto</option>
          </select>

          <h5>Choose Cheese</h5>
          <select
            className="form-select mb-3"
            value={selectedCheese}
            onChange={(e) => setSelectedCheese(e.target.value)}
          >

            <option>Mozzarella</option>
            <option>Cheddar</option>
            <option>Parmesan</option>
            <option>Vegan Cheese</option>
          </select>

          <h5>
  {pizzaType === "veg" ? "Select Veg Toppings" : "Select Toppings"}
</h5>

<div className="mb-3">
  {/* ---- VEG TOPPINGS (ALWAYS AVAILABLE) ---- */}
  <strong className="d-block mb-2">Veg Toppings</strong>

  <label className="me-3 d-inline-block">
  <input
    type="checkbox"
    value="Onion"
    onChange={(e) => {
      if (e.target.checked) {
        setVegToppings([...vegToppings, e.target.value]);
      } else {
        setVegToppings(vegToppings.filter(t => t !== e.target.value));
      }
    }}
  /> Onion
</label>


  <label className="me-3 d-inline-block">
  <input
    type="checkbox"
    value="Capsicum"
    onChange={(e) => {
      if (e.target.checked) {
        setVegToppings([...vegToppings, e.target.value]);
      } else {
        setVegToppings(vegToppings.filter(t => t !== e.target.value));
      }
    }}
  /> Capsicum
</label>


  <label className="me-3 d-inline-block">
  <input
    type="checkbox"
    value="Tomato"
    onChange={(e) => {
      if (e.target.checked) {
        setVegToppings([...vegToppings, e.target.value]);
      } else {
        setVegToppings(vegToppings.filter(t => t !== e.target.value));
      }
    }}
  /> Tomato
</label>

    <label className="me-3 d-inline-block">
    <input
      type="checkbox"
      value="Golden Corn"
      onChange={(e) => {
        if (e.target.checked) {
          setVegToppings([...vegToppings, e.target.value]);
        } else {
          setVegToppings(vegToppings.filter(t => t !== e.target.value));
        }
      }}
    /> Golden Corn
  </label>
  
    <label className="me-3 d-inline-block">
    <input
      type="checkbox"
      value="Black Olives"
      onChange={(e) => {
        if (e.target.checked) {
          setVegToppings([...vegToppings, e.target.value]);
        } else {
          setVegToppings(vegToppings.filter(t => t !== e.target.value));
        }
      }}
    /> Black Olives
  </label>
  
    <label className="me-3 d-inline-block">
    <input
      type="checkbox"
      value="Spicy Jalapeno"
      onChange={(e) => {
        if (e.target.checked) {
          setVegToppings([...vegToppings, e.target.value]);
        } else {
          setVegToppings(vegToppings.filter(t => t !== e.target.value));
        }
      }}
    /> Spicy Jalapeno
  </label>
  
    <label className="me-3 d-inline-block">
    <input
      type="checkbox"
      value="Red Paprika"
      onChange={(e) => {
        if (e.target.checked) {
          setVegToppings([...vegToppings, e.target.value]);
        } else {
          setVegToppings(vegToppings.filter(t => t !== e.target.value));
        }
      }}
    /> Red Paprika
  </label>

  {/* ---- NON-VEG TOPPINGS (ONLY IF NON-VEG) ---- */}
  {pizzaType === "nonveg" && (
    <>
      <hr />
      <strong className="d-block mb-2">Non-Veg Toppings</strong>

      <label className="me-3 d-inline-block">
<input
  type="checkbox"
  value="Herb Grilled Chicken"
  onChange={(e) => {
    if (e.target.checked) {
      setNonVegToppings([...nonVegToppings, e.target.value]);
    } else {
      setNonVegToppings(nonVegToppings.filter(t => t !== e.target.value));
    }
  }}
/> Herb Grilled Chicken
      </label>

      <label className="me-3 d-inline-block">
        <input
          type="checkbox"
          value="Spicy Peri Peri Chicken"
          onChange={(e) => {
            if (e.target.checked) {
              setNonVegToppings([...nonVegToppings, e.target.value]);
            } else {
              setNonVegToppings(nonVegToppings.filter(t => t !== e.target.value));
            }
          }}
        /> Spicy Peri Peri Chicken
      </label>

      <label className="me-3 d-inline-block">
        <input
          type="checkbox"
          value="Smokey BBQ Chicken"
          onChange={(e) => {
            if (e.target.checked) {
              setNonVegToppings([...nonVegToppings, e.target.value]);
            } else {
              setNonVegToppings(nonVegToppings.filter(t => t !== e.target.value));
            }
          }}
        /> Smokey BBQ Chicken
      </label>

      <label className="me-3 d-inline-block">
        <input
          type="checkbox"
          value="Roast Chicken"
          onChange={(e) => {
            if (e.target.checked) {
              setNonVegToppings([...nonVegToppings, e.target.value]);
            } else {
              setNonVegToppings(nonVegToppings.filter(t => t !== e.target.value));
            }
          }}
        /> Roast Chicken
      </label>

      <label className="me-3 d-inline-block">
        <input
  type="checkbox"
  value="Chicken Tikka"
  onChange={(e) => {
    if (e.target.checked) {
      setNonVegToppings([...nonVegToppings, e.target.value]);
    } else {
      setNonVegToppings(nonVegToppings.filter(t => t !== e.target.value));
    }
  }}
/> Chicken Tikka
      </label>
    </>
  )}
</div>

  

          <button
            className="btn btn-success w-100"
            onClick={handleAddCustomPizza}
          >
            Add Custom Pizza to Cart
          </button>

        </div>
      </div>
    </div>
  </div>
)}

<div
  className="view-cursor"
  id="viewCursor"
  style={{
    "--cursor-bg":
      cursorType === "veg"
        ? "radial-gradient(circle at center, rgb(137, 211, 0), rgb(0, 102, 0))"
        : "radial-gradient(circle at center, rgb(255,158,0), rgb(255,0,0))"
  }}
>
  <div className="view-text">
    <svg viewBox="0 0 200 200">
      <defs>
        <path
          id="circlePath"
          d="M 100,100
             m -75,0
             a 75,75 0 1,1 150,0
             a 75,75 0 1,1 -150,0"
        />
      </defs>
      <text>
        <textPath href="#circlePath">
          {cursorText}
        </textPath>
      </text>
    </svg>
  </div>

  <div className="view-cursor-inner" />
</div>


      <Footer />
    </div>
  )
}

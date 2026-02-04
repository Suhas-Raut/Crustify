import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';
import vegIcon from "./Images/veg.svg";
import nonVegIcon from "./Images/nonveg.svg";
import badgeVeg from "./Images/veg1.png";
import badgeNonVeg from "./Images/nonveg1.png";



export default function Card(props) {
  let data = useCart();
  const dispatch = useDispatchCart();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();

  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);



  const handleQty = (e) => setQty(e.target.value);
  const handleOptions = (e) => setSize(e.target.value);

const handleAddToCart = () => {
  let food = data.find(
    item => item.id === foodItem.id && item.size === size
  );

  if (food) {
    dispatch({
      type: "UPDATE",
      id: foodItem.id,
      price: finalPrice,
      qty
    });
    return;
  }

  dispatch({
    type: "ADD",
    item: {
      id: foodItem.id,
      name: foodItem.name,
      price: finalPrice,
      qty,
      size,
      img: props.ImgSrc
    }
  });
};




 let finalPrice = size ? qty * parseInt(options[size]) : 0;

  return (
    <div className="card-container">
  <div className="hero-image-container">
    <img src={props.ImgSrc} alt={props.foodName} className="hero-image" />
  </div>

  <main className="main-content">
  <div
  className="food-title"
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }}
>
  {/* LEFT SIDE — KEEP EXACTLY AS YOU HAVE */}
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <img
      src={foodItem.type === "veg" ? vegIcon : nonVegIcon}
      alt={foodItem.type}
      style={{ width: "14px", height: "14px" }}
    />
    <h1>{props.foodName}</h1>
  </div>

  {/* RIGHT SIDE — EXTRA BADGE (32×32 PNG) */}
  <img
    src={foodItem.type === "veg" ? badgeVeg : badgeNonVeg}
    alt={foodItem.type + " badge"}
    style={{ width: "32px", height: "32px" }}
  />
  </div>



    <p>Select quantity & size:</p>
    <div className="flex-row">
      <select className="glass-select" onChange={handleQty}>
  {Array.from(Array(6), (_, i) => (
    <option key={i + 1} value={i + 1}>{i + 1}</option>
  ))}
</select>

<select className="glass-select" ref={priceRef} onChange={handleOptions}>
  {priceOptions.map(i => (
    <option key={i} value={i}>{i}</option>
  ))}
</select>


      <div className="price-badge">
  <span className="price-tag">₹{finalPrice}/-</span>
</div>
    </div>
  </main>

<button className="glass-btn" onClick={handleAddToCart}>
  Add to Cart
</button>



</div>

  );
}

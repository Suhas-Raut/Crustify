const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

const Order = require("../models/Orders");
const Inventory = require("../models/Inventory");
const sendMail = require("../utils/mailer");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// 1️⃣ CREATE RAZORPAY ORDER
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "order_rcptid_" + Date.now()
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Order creation failed" });
  }
});

// 2️⃣ VERIFY PAYMENT + SAVE ORDER
router.post("/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
      email,
      totalAmount
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // ✅ SAVE ORDER
    const newOrder = await Order.create({
      email,
      order_data: orderData,
      status: "Order Received",
      paymentId: razorpay_payment_id,
      amount: totalAmount
    });

    
   // ✅ UPDATE INVENTORY (REAL deduction)
const inventory = await Inventory.findOne();
if (!inventory) {
  return res.status(500).json({ success: false, message: "Inventory not found" });
}

orderData.forEach(item => {
  const key = item.name.replace(/\s+/g, "").toLowerCase();

  // unified storage bucket
  if (inventory.stock[key] !== undefined) {
    inventory.stock[key] -= item.qty;
    if (inventory.stock[key] < 0) inventory.stock[key] = 0;
  }
});

await inventory.save();


    // ✅ SEND MAIL
    await sendMail({
      to: email,
      subject: "Order Confirmed 🍕",
      html: `<h3>Your order has been placed successfully!</h3>
             <p>Payment ID: ${razorpay_payment_id}</p>`
    });

    res.json({ success: true, order: newOrder });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

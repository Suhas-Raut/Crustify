const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");
const fetchdetails = require("../middleware/fetchdetails");
const isAdmin = require("../middleware/isAdmin");
const sendOrderMail = require("../utils/sendMail");
const Order = require("../models/Orders");


router.get("/inventory", fetchdetails, isAdmin, async (req, res) => {
  try {
    let inventory = await Inventory.findOne();

    if (!inventory) {
      inventory = await Inventory.create({ items: {} });
    }

    res.json({
      success: true,
      inventory
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});




// 3️⃣ GET ALL ORDERS
router.get("/orders", fetchdetails, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});




// 5️⃣ DASHBOARD STATS
router.get("/stats", fetchdetails, isAdmin, async (req, res) => {
  const orders = await Order.find();
  const revenue = orders.reduce((sum, o) => sum + (o.amount || 0), 0);

  res.json({
    orders: orders.length,
    revenue,
    lowStock: 3
  });
});
router.post("/inventory/init", fetchdetails, isAdmin, async (req, res) => {
  const exists = await Inventory.findOne();
  if (exists) return res.json(exists);

  const inventory = await Inventory.create({});
  res.json(inventory);
});


router.post("/inventory", fetchdetails, isAdmin, async (req, res) => {
  try {
    let inventory = await Inventory.findOne();
    if (!inventory) inventory = new Inventory({});

    inventory.items = Object.fromEntries(
      Object.entries(req.body).map(([key, value]) => [
        key,
        Number(value)
      ])
    );

    inventory.updatedAt = new Date();
    await inventory.save();

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});


// Sending email function
router.put("/order-status", fetchdetails, isAdmin, async (req, res) => {
  const { userEmail, orderId, status } = req.body;

  const user = await Order.findOne({ email: userEmail });
  if (!user) return res.status(404).json({ success: false });

  const order = user.order_data.find(o => o[0].orderId === orderId);
  if (!order) return res.status(404).json({ success: false });

  order[0].status = status;
  await user.save();

  // 📧 EMAIL (NOW WORKS)
  if (status === "In Kitchen") {
    await sendOrderMail(userEmail, "👨‍🍳 Order in Kitchen", "Your food is being prepared!");
  }

  if (status === "Out for Delivery") {
    await sendOrderMail(userEmail, "🚚 Out for Delivery", "Your order is on the way!");
  }

  res.json({ success: true });
});





module.exports = router;

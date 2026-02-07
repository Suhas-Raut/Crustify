const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");
const fetchdetails = require("../middleware/fetchdetails");
const isAdmin = require("../middleware/isAdmin");

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



const Order = require("../models/Orders");

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


// 4️⃣ UPDATE ORDER STATUS
router.put("/order/:id", fetchdetails, isAdmin, async (req, res) => {

  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  if (status === "In Kitchen") {
    await sendMail(
      order.userEmail,
      "👨‍🍳 Order in Kitchen",
      "Your order is being prepared."
    );
  }

  if (status === "Sent to Delivery") {
    await sendMail(
      order.userEmail,
      "🚚 Out for Delivery",
      "Your order is on the way!"
    );
  }

  res.json({ success: true, order });
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
const sendMail = require("../utils/mailer");
const Order = require("../models/Orders");

router.put("/order-status", fetchdetails, isAdmin, async (req, res) => {
  try {
    const { userEmail, orderIndex, status } = req.body;

    const userOrders = await Order.findOne({ email: userEmail });
    if (!userOrders) {
      return res.status(404).json({ success: false });
    }

    // update status inside meta object
    userOrders.order_data[orderIndex][0].status = status;
    await userOrders.save();

    // 📧 EMAIL NOTIFICATIONS
    if (status === "In Kitchen") {
      await sendMail(
        userEmail,
        "👨‍🍳 Order in Kitchen",
        "Your order is now being prepared."
      );
    }

    if (status === "Out for Delivery") {
      await sendMail(
        userEmail,
        "🚚 Out for Delivery",
        "Your order is on the way!"
      );
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});



module.exports = router;

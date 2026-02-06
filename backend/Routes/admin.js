const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");
const fetchdetails = require("../middleware/fetchdetails");
const isAdmin = require("../middleware/isAdmin");

// GET INVENTORY
router.get("/inventory", fetchdetails, isAdmin, async (req, res) => {
  try {
    let inventory = await Inventory.findOne();

    // 👇 AUTO CREATE if not exists
    if (!inventory) {
      inventory = new Inventory({});
      await inventory.save();
    }

    res.json(inventory);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

/**
 * 2️⃣ UPDATE INVENTORY (Refill / Adjust)
 */
router.put("/inventory", fetchdetails, isAdmin, async (req, res) => {
  try {
    const updates = req.body;

    let inventory = await Inventory.findOne();
    if (!inventory) {
      inventory = await Inventory.create({});
    }

    Object.keys(updates).forEach(category => {
      inventory[category] = {
        ...inventory[category],
        ...updates[category]
      };
    });

    await inventory.save();
    res.json({ success: true, inventory });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const Order = require("../models/Orders");

// 3️⃣ GET ALL ORDERS
router.get("/orders", fetchdetails, isAdmin, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// 4️⃣ UPDATE ORDER STATUS
router.put("/order/:id", fetchdetails, isAdmin, async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(order);
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


// SAVE / UPDATE INVENTORY
router.post("/inventory", async (req, res) => {
  try {
    const data = req.body;

    let inventory = await Inventory.findOne();
    if (!inventory) {
      inventory = new Inventory({ items: data });
    } else {
      inventory.items = data;
    }

    await inventory.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});



module.exports = router;

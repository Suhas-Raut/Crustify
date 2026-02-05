const express = require("express");
const router = express.Router();

const Inventory = require("../models/Inventory");
const fetchdetails = require("../middleware/fetchdetails");
const isAdmin = require("../middleware/isAdmin");

/**
 * 1️⃣ GET INVENTORY (Admin Dashboard)
 */
router.get("/inventory", fetchdetails, isAdmin, async (req, res) => {
  try {
    let inventory = await Inventory.findOne();

    if (!inventory) {
      inventory = await Inventory.create({
        pizzaBase: 100,
        sauce: 100,
        cheese: 100,
        veggies: 100,
        meat: 100
      });
    }

    res.json(inventory);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 2️⃣ UPDATE INVENTORY (Refill / Adjust)
 */
router.put("/inventory", fetchdetails, isAdmin, async (req, res) => {
  try {
    const updates = req.body;

    const inventory = await Inventory.findOneAndUpdate(
      {},
      { $set: updates },
      { new: true }
    );

    res.json({ success: true, inventory });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

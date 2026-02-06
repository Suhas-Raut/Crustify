const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  items: {
    type: Object,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Inventory", InventorySchema);

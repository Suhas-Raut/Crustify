const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema(
  {
    items: {
      type: Map,
      of: Number,
      default: {}
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", InventorySchema);

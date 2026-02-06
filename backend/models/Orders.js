const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  userEmail: String,
  items: [
    {
      name: String,
      qty: Number
    }
  ],
  totalAmount: Number,
  status: {
    type: String,
    default: "Order Received"
  }
}, { timestamps: true });

module.exports = mongoose.model("Orders", OrderSchema);

const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  order_data: { type: Array, required: true },
  status: { type: String, default: "Order Received" },
  paymentId: String,
  amount: Number
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);

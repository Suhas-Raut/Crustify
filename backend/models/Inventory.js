const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  // ---- BASES ----
  bases: {
    classicHandTossed: { type: Number, default: 100 },
    thinCrust: { type: Number, default: 100 },
    cheeseBurst: { type: Number, default: 80 },
    wholeWheat: { type: Number, default: 60 },
    freshPan: { type: Number, default: 70 }
  },

  // ---- SAUCES ----
  sauces: {
    classicTomato: { type: Number, default: 200 },
    bbq: { type: Number, default: 150 },
    periPeri: { type: Number, default: 150 },
    whiteGarlic: { type: Number, default: 120 },
    pesto: { type: Number, default: 80 }
  },

  // ---- CHEESE ----
  cheese: {
    mozzarella: { type: Number, default: 200 },
    cheddar: { type: Number, default: 150 },
    parmesan: { type: Number, default: 100 },
    vegan: { type: Number, default: 80 }
  },

  // ---- VEG TOPPINGS ----
  vegToppings: {
    onion: { type: Number, default: 300 },
    capsicum: { type: Number, default: 300 },
    tomato: { type: Number, default: 300 },
    corn: { type: Number, default: 250 },
    olives: { type: Number, default: 200 },
    jalapeno: { type: Number, default: 200 },
    paprika: { type: Number, default: 180 }
  },

  // ---- NON-VEG TOPPINGS ----
  nonVegToppings: {
    herbChicken: { type: Number, default: 200 },
    periPeriChicken: { type: Number, default: 180 },
    bbqChicken: { type: Number, default: 180 },
    roastChicken: { type: Number, default: 150 },
    chickenTikka: { type: Number, default: 150 }
  },

  // ---- OTHER ITEMS ----
  misc: {
    burgerBuns: { type: Number, default: 300 },
    vegPatties: { type: Number, default: 250 },
    chickenPatties: { type: Number, default: 200 },
    pastries: { type: Number, default: 200 },
    beverages: { type: Number, default: 400 }
  },

  // ---- THRESHOLDS ----
  thresholds: {
    base: { type: Number, default: 20 },
    sauce: { type: Number, default: 30 },
    cheese: { type: Number, default: 30 },
    toppings: { type: Number, default: 40 }
  }

}, { timestamps: true });

module.exports = mongoose.model("Inventory", InventorySchema);

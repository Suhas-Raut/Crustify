const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

console.log("Mongo URI loaded:", mongoURI ? "YES" : "NO");

module.exports = function (callback) {
  mongoose.set('strictQuery', false);
  mongoose.connect(mongoURI)
    .then(async () => {
      console.log("✅ Connected to MongoDB");

      const db = mongoose.connection.db;

      const foodData = await db.collection("food_items").find({}).toArray();
      const categoryData = await db.collection("Categories").find({}).toArray();

      callback(null, foodData, categoryData);
    })
    .catch(err => {
      console.error("❌ MongoDB connection error:", err);
      callback(err, [], []);
    });
};

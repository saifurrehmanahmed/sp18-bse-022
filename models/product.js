var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  prName: String,
  prCategory: String,
  prPrice: Number,
  prDetails: String,
  prImage: String,
});
var Product = mongoose.model("Product", productSchema);

module.exports = Product;


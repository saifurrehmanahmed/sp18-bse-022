const express = require("express");
let router = express.Router();
var Product = require("../../models/product");
const cloudinary = require("../../model/cloud");
const upload = require("../../model/multer");
//get products
router.get("/", async (req, res) => {
  let products = await Product.find();
  return res.send(products);
});
//get single products
// router.get("/:id", async (req, res) => {
//   try {
//     let product = await Product.findById(req.params.id);
//     if (!product)
//       return res.status(400).send("Product With given ID is not present"); //when id is not present id db
//     return res.send(product); //everything is ok
//   } catch (err) {
//     return res.status(400).send("Invalid ID"); // format of id is not correct
//   }
// });

//Insert a record
router.post("/add", upload.single("prImage"), async (req, res) => {

    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
  let product = new Product();
  product.prName = req.body.prName;
  product.prCategory = req.body.prCategory;
  product.prPrice = req.body.prPrice;
  product.prDetails = req.body.prDetails;
  product.prImage = result.secure_url;
  await product.save();
  return res.send(product);
  }
  catch (err) {
    console.log(err);
  }
});
module.exports = router;

const express = require("express");
const adminRouter = express.Router();
const admin = require("../middlewares/admin");
const { Product } = require("../models/product");
const { PromiseProvider } = require("mongoose");
const schedule = require('node-schedule')
const moment = require('moment');

// Add product
adminRouter.post("/admin/add-product", async (req, res) => {
  try {
    const { name, description, images, location, price, buyer, seller, status, 
      dealer, url, buyerImage, receiver, sellerId, deliveryDate, terminate, buyerRating, sellerRating} = req.body;
      
    let product = new Product({
      name,
      description,
      images,
      location,
      price,
      buyer,
      seller,
      status,
      dealer,
      url,
      buyerImage,
      receiver,
      sellerId,
      deliveryDate,
      terminate,
      buyerRating,
      sellerRating,
    });

    product = await product.save();
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get all your products
adminRouter.get("/admin/get-products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Delete the product
adminRouter.post("/admin/delete-product", async (req, res) => {
  try {
    const { id } = req.body;
    let product = await Product.findByIdAndDelete(id);
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//// Activate Contract
adminRouter.post("/admin/activate-contract", async (req, res) => {
  const  product = Product;
  try {
    const { id, status, deliveryDate} = req.body;
    const new_status = await product.findByIdAndUpdate(id, {
      status: 'Imekubaliwa',
      deliveryDate
    });
    res.json(new_status);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// set Terminate timer
adminRouter.post("/api/terminate-timer",  (req, res) => {
  const { id, timer } = req.body;
  console.log(req.body);
  // var time = moment(timer).format('MMMM MM YYYY h:mm:ss');
  const someDate = new Date(timer)

  
schedule.scheduleJob(someDate, async() => {
  try {
    let product = await Product.findByIdAndUpdate(id, {terminate: 'Active'});
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
})

});



module.exports = adminRouter;

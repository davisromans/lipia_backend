const express = require("express");
const historyRouter = express.Router();
const admin = require("../middlewares/admin");
const { History } = require("../models/history");
const { PromiseProvider } = require("mongoose");

// Add History
historyRouter.post("/api/history", async (req, res) => {
  try {
    const {buyer, seller, product, type, amount, imageBuyer, imageSeller, date, time, status,} = req.body;
      
    let history = new History({
      buyer,
      seller,
      product,
      type,
      amount,
      imageBuyer,
      imageSeller,
      date,
      time,
      status
    });

    history = await history.save();
    res.json(history);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

historyRouter.post("/api/get-history", async (req, res) => {
  try {
    const userphone = req.body;
    const user = await History.find(userphone);
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = historyRouter;
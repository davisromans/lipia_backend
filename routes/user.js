const express = require("express");
const userRouter = express.Router();
const auth = require("../middlewares/auth");
const { Product } = require("../models/product");
const { updateOne, db } = require("../models/user");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const Db = require("mongodb/lib/db");

userRouter.post("/api/update_profile", async (req, res) => {
const  product = Product;
  try {
    const {id, name, phone, password, images, productPhone, dpUrl} = req.body;
    const hashedPassword = await bcryptjs.hash(password, 8);
    let changes = phone; 
    let photo = images[0]; 
    

    await db.collection('products').updateMany
    (
      {
        url : dpUrl
      },
      {
        $set :
        {
          "url" : photo,
        }
      }
    )
    
    await db.collection('products').updateMany
    (
      {
        buyerImage : dpUrl
      },
      {
        $set :
        {
          "buyerImage" : photo,
        }
      }
    )

      await db.collection('products').updateMany
      (
        {
          buyer : productPhone
        },
        {
          $set :
          {
            "buyer" : changes,
          }
        }
      )
      
      await db.collection('products').updateMany
      (
        {
          seller : productPhone
        },
        {
          $set :
          {
            "seller" : changes,
          }
        }
      )   

  
      const options = {new: true};
    const user = await User.findByIdAndUpdate(id, {
      phone,
      password: hashedPassword,
      name,
      images,
    }, options);

    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


// rate user
userRouter.post("/api/rate-user", async (req, res) => {
  try {
    const { id, rating, userId} = req.body;
    let user = await User.findById(id);

    for (let i = 0; i < user.ratings.length; i++) {
      if (user.ratings[i].userId == userId) {
        user.ratings.splice(i, 1);
        break;
      }
    }

  

    const ratingSchema = {
      userId: userId,
      rating
    };

    user.ratings.push(ratingSchema);
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = userRouter;

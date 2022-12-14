// IMPORTS FROM PACKAGES
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const adminRouter = require("./routes/admin");
dotenv.config();

// IMPORTS FROM OTHER FILES
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const historyRouter = require("./routes/history");

// INIT
const PORT = process.env.PORT || 3000;
const app = express();
const DB =
  "mongodb+srv://Davis:Devintech1994.@cluster0.ytticbk.mongodb.net/?retryWrites=true&w=majority";

// middleware
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(userRouter);
app.use(historyRouter);


// Connections
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected at port ${PORT}`);
});

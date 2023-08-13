const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/user");
const dataRoutes = require("./routes/data");

app.use(express.json());

app.use("/auth", userRoutes);
app.use("/data", dataRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/Flipkart-Api", {});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

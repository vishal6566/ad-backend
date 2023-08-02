const express = require("express");
require("dotenv").config();
const app = express();
const connectDB = require("./config/database");
const router = require("./routes/bookingRoutes");
const cors = require("cors");

const port = process.env.PORT;
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome...");
});

app.use("/api", router);

app.listen(port, async () => {
  try {
    await connectDB;
    console.log("MongoDB To Connect Successfully !");
  } catch (error) {
    console.log(error);
  }
  console.log(`Listing on port ${port}`);
});

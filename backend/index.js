// 3rd party packages
require("dotenv").config({ path: "./src/config/.env" });
require("express-async-errors");
const cors = require("cors");
const express = require("express");

// imports
const connectDB = require("./src/config/database");
const imageRoute = require("./src/api");
const notFound = require("./src/middlewares/notfound");
const errorHandler = require("./src/middlewares/errorHandler");

//app
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1/images", imageRoute);


app.use(notFound);
app.use(errorHandler)


const PORT = process.env.PORT || 3000;
app.listen(PORT, async (req, res) => {
  await connectDB();
  console.log(`server running on ${PORT}`);
});

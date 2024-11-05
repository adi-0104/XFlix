const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const DB_URI = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/xflix";
const PORT = process.env.PORT || 3000
const routes = require("./routes/videos.routes");
const { errorHandler } = require("./middlewares/errors");

const app = express();
//Connect to DB
mongoose
  .connect(DB_URI)
  .then(() => console.log(`Connected to DB at: ${DB_URI}`))
  .catch(() => console.log("Failed to connect to DB"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/v1", routes);

//set error handler 
app.use(errorHandler);
//start backend server
app.listen(PORT, () =>
  console.log(`Server successfully running on port ${PORT}`)
);

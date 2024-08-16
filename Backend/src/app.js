// console.log("Hello World")
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mySqlPool = require("../config/db");
const app = express();
require("dotenv").config();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", require("../Routes/employeeRoutes"));
const PORT = 8000;

app.get("/", (req, res) => {
  console.log("Api is Hit");
  res.send({ data: "Hello" });
});

mySqlPool
  .query("SELECT 1")
  .then(() => {
    console.log("db Connected");
    app.listen(PORT, () => {
      console.log("Port is listing");
    });
  })
  .catch((e) => {
    console.log("The error is" + e);
  });

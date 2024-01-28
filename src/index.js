const express = require("express");
const app = express();
const port = 3000;
const route = require("../src/routes/index.route");
const moongose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: "./src/.env" });

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("common"));
route(app);
moongose
  .connect(
    "mongodb+srv://jagerthejagershopDB:NguyenPhiTuanAn13121910@jagerthejagershop.08pgz.mongodb.net/"
  )
  .then(console.log("Connected to DB"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

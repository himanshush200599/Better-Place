const csv = require("fast-csv");
const express = require("express");
require("../models/details");
const router = express.Router();
const fs = require("fs");
const mongoose = require("mongoose");
const Details = mongoose.model("details");
const csvfile = __dirname + "/../public/files/details.csv";
const stream = fs.createReadStream(csvfile);

router.get("/api/addCSVData", (req, res, next) => {
  let products = [];

  let csvStream = csv()
    .on("data", function(data) {
      let item = new Details({
        rank: data[0],
        grade: data[1],
        channelName: data[2],
        uploads: data[3],
        subscribers: data[4],
        views: data[5]
      });
      console.log(item, "himnshu");
      item.save();
    })
    .on("end", function() {
      console.log(" End of file import");
    });

  stream.pipe(csvStream);
  res.json({ success: "Data imported successfully.", status: 200 });
});

router.get("/api/fetchData", (req, res, next) => {
  Details.find({}, (err, data) => {
    if (!err) {
      return res.json({ data });
    } else {
      throw err;
    }
  });
});

module.exports = router;

const mongoose = require("mongoose");

function connectToDb() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Database connect Successfully!");
    })
    .catch((err) => {
      console.log(`💥Error while correcting to DB:💥${err} `);
    });
}

module.exports = connectToDb;

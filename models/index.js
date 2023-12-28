const mongoose = require("mongoose");

const connectToMongo = (mongoURI) => {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("Database Connected Successfully."))
    .catch((err) => {
      console.error(err);
    });
};
module.exports = connectToMongo;

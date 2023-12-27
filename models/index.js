const mongoose = require("mongoose");
// const mongoURI = process.env.MONGO_URI;
//   "mongodb+srv://zulfiqarfaisal4:GY79NzXUndeVpU4a@cluster0.xghgvv0.mongodb.net/?retryWrites=true&w=majority";
const connectToMongo = (mongoURI) => {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("Database Connected Successfully."))
    .catch((err) => {
      console.error(err);
    });
};
module.exports = connectToMongo;

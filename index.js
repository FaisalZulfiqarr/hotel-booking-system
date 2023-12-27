const connectToMongo = require("./models");
const dotenv = require("dotenv");
const express = require("express");

dotenv.config();
connectToMongo(process.env.MONGO_URI);

const app = express();
const port = process.env.PORT;
// console.log("port = ", process.env.PORT);
// console.log("MONGO URI = ", process.env.MONGO_URI);

app.use(express.json());
//Users route
const users = require("./routes/users");
app.use("/api/user", users);

app.get("/api", (req, res) => {
  res.send("Hotel Booking System Backend Running........");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

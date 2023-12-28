const connectToMongo = require("./models");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

dotenv.config();
connectToMongo(process.env.MONGO_URI);

const app = express();
app.use(
  cors({
    origin: `http://localhost:3000`,
    credentials: true,
  })
);
const port = process.env.PORT;
// console.log("port = ", process.env.PORT);
// console.log("MONGO URI = ", process.env.MONGO_URI);

app.use(express.json());

// Users route
const users = require("./routes/users");
app.use("/api/user", users);

// Rooms route
const rooms = require("./routes/rooms");
app.use("/api/room", rooms);

// CustomersData route
const customerData = require("./routes/customerData");
app.use("/api/customerData", customerData);

// Bookings route
const bookings = require("./routes/bookings");
app.use("/api/booking", bookings);

app.get("/api", (req, res) => {
  res.send("Hotel Booking System Backend Running........");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

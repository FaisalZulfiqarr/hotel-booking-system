const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
} = require("../controllers/users");

router.post("/createUser", createUser);
router.post("/login", loginUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getUser/:id", getUserById);
// router.delete("/deleteAds/:id", deleteAds);
// router.put("/updateAds/:id", updateAds);

module.exports = router;

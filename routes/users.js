const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/users");

router.post("/createUser", createUser);
router.post("/login", loginUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getUser/:id", getUserById);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
} = require("../controllers/rooms");

router.get("/getAllRooms", getAllRooms);
router.post("/createRoom", createRoom);
router.get("/getRoom/:roomId", getRoomById);
router.put("/updateRoom/:roomId", updateRoom);
router.delete("/deleteRoom/:roomId", deleteRoom);

module.exports = router;

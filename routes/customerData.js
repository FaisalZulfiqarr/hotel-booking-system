const express = require("express");
const router = express.Router();
const {
  getAllCustomersData,
  createCustomerData,
  getCustomerDataById,
  updateCustomerData,
  deleteCustomerData,
} = require("../controllers/customerData");

router.get("/getAllCustomersData", getAllCustomersData);
router.post("/createCustomerData", createCustomerData);
router.get("/getCustomerData/:customerId", getCustomerDataById);
router.put("/updateCustomerData/:customerId", updateCustomerData);
router.delete("/deleteCustomerData/:customerId", deleteCustomerData);

module.exports = router;

const Users = require("../models/Users");
// const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const fetchuser = require("../middleware/fetchuser");

const createUser = async (req, res) => {
  try {
    // check whether the user with this email exists already:
    let user = await Users.findOne({ email: req.body.email });

    if (user) {
      return res
        .status(401)
        .json({ message: "Sorry a user with this email already exists" });
    }

    //hashing and adding salt to the password:
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await Users.create({
      username: req.body.username,
      role: "admin",
      password: secPass,
      email: req.body.email,
      phoneNo: req.body.phoneNo,
      address: req.body.address,
      salary: req.body.salary,
      age: req.body.age,
      dateOfBirth: req.body.dateOfBirth,
    });

    return res.status(200).json({ message: "User created successfully." });
  } catch (error) {
    success = false;
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured.");
  }
};
//Get All Users:
const getAllUsers = async (req, res) => {
  try {
    const users = await Ads.findAll();
    if (ads.length) {
      return res.status(200).json(ads);
    }
    return res.status(204).json({ message: "There isn't any Ads yet." });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: "Server Error: Could not retrieve Ads",
    });
  }
};

// User Login
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await Users.findOne({ username });
    if (!user) {
      return res.status(401).json({
        error: "Please try to login with correct credentials",
      });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(401).json({
        error: "Please try to login with correct credentials",
      });
    }
    const data = {
      id: user.id,
    };
    const authToken = jwt.sign(data, process.env.JWT_SECRET); //returns a promise

    // res.json(user);

    res.json({ authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured.");
  }
};

// Get User By Id:
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);
    console.log("user", user);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send("There isn't any user of this Id exist.");
    }
  } catch (error) {
    // console.error(error.message);
    res.status(500).send("Internal Server Error Occured.");
  }
};

// Update an Ad:
const updateAds = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);

    const [ads] = await Ads.update(req.body, {
      where: { id },
    });
    console.log("ads", ads);
    if (ads) {
      return res.status(204).json({
        message: "Ad updated successfully.",
        Ads: await Ads.findOne({
          where: { id },
        }),
      });
    }
    return res
      .status(201)
      .json({ message: "There isn't any Ad of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error: Could not update the Ad",
    });
  }
};

// Delete an Ads:
const deleteAds = async (req, res) => {
  try {
    const { id } = req.params;

    const ads = await Ads.findOne({
      where: { id },
    });
    if (ads) {
      await ads.destroy();
      return res.status(204).json({
        message: "Ad deleted successfully.",
      });
    }

    return res
      .status(201)
      .json({ message: "There isn't any Ad of this id exist." });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: "Server Error: Could not delete the Ad",
    });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  getUserById,
  // updateUser,
  // deleteUser,
};

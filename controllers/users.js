const Users = require("../models/Users");
// const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const fetchuser = require("../middleware/fetchuser");

// Create a new User:
const createUser = async (req, res) => {
  try {
    // check whether the user with this email already exists or not:
    let user = await Users.findOne({ email: req.body.email });

    if (user) {
      return res
        .status(400)
        .json({ message: "Sorry a user with this email already exists." });
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
    console.error(error.message);

    res.status(500).send({
      error: "Internal Server Error: Could not create user.",
    });
  }
};
//Get All Users:
const getAllUsers = async (req, res) => {
  try {
    // console.log(
    //   jwt.verify(
    //     req.headers.cookie?.split("authToken=")[1],
    //     process.env.JWT_SECRET
    //   )
    // );
    const users = await Users.find();

    if (users.length) {
      return res.status(200).json(users);
    }
    return res.status(404).json({ message: "There isn't any Users yet." });
  } catch (error) {
    console.error(error.message);

    res.status(500).send({
      error: "Internal Server Error: Could not retrieve Users.",
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
      username: user.username,
    };
    const authToken = jwt.sign(data, process.env.JWT_SECRET); //returns a promise

    return res
      .cookie("authToken", authToken, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
      })
      .json({ authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      error: "Internal Server Error: Could not login User.",
    });
  }
};

// Get User By Id:
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);

    if (user) {
      return res.status(200).send(user);
    }
    return res.status(404).send("There isn't any user of this Id exist.");
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      error: "Internal Server Error: Could not get the user by Id.",
    });
  }
};

// Update a User:
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findByIdAndUpdate(id, req.body);

    if (user) {
      return res.status(200).json({
        message: "User updated successfully.",
      });
    }
    return res
      .status(404)
      .json({ message: "There isn't any User of this Id exist." });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "Internal Server Error: Could not update the user by Id.",
    });
  }
};

// Delete a User:
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findByIdAndDelete(id);

    if (user) {
      return res.status(200).json({
        message: "User deleted successfully.",
      });
    }

    return res
      .status(404)
      .json({ message: "There isn't any User of this id exist." });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "Internal Server Error: Could not delete the user.",
    });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
};

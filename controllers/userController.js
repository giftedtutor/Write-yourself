import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

// Login user into the Database

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or Password");
  }
});

// Register users in database

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400).json({ message: "User already Exists" });
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      message: 'User Account Created'
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//Get all user from the database

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// forgot password

const forgotPassword = asyncHandler(async (req, res) => {
  const userExist = await User.findOne({ email: req.body.email });
  if (!userExist) {
    return res.status(403).json("No user exist in this email");
  }

  try {
    const secret = process.env.JWT_SECRET;
    const payload = {
      email: req.body.email,
    };

    // set expiration time for the link

    const token = jwt.sign(payload, secret, { expiresIn: "15m" });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mi477048@gmail.com",
        pass: "samarbagh123456",
        // user: "moodlog58@gmail.com",
        // pass: "*moodlog#",
      },
    });

    //   user: "moodlog58@gmail.com",
    // pass: "*moodlog#",
 
    var mailOptions = {
      from: "Fuzzy Website",
      to: req.body.email,
      subject: "Reset your password",
      html: `
    <h6>Reset your account password through the following link </h6>
    <p><a href="http://localhost:3000/#/reset/${userExist._id}/${token}">reset password</a> </p>
    `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({ message: "Check your email for reseting" });
  } catch (error) {
    console.log(error);
  }
});

// add the updated password to the user

const addUpdatePass = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const secret = process.env.JWT_SECRET;
  const payload = jwt.verify(req.params.token, secret);
  if (!payload) {
    return res.status(402).json("Your token is expire");
  }
  if (user) {
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    return res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("Invalid user ID");
  }
});

export { login, register, getUsers, addUpdatePass, forgotPassword };

const express = require("express");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const cloudinary = require("cloudinary"); // Make sure to install and configure the Cloudinary library

cloudinary.config({
  cloud_name: "projectcloudat7",
  api_key: "844666871246736",
  api_secret: "3hh3zsHqGjIxkRDurENWqaET848",
});
module.exports.register = async (req, res) => {
  try {
    const { firstname, lastname, email, password, regNo } = req.body;
    //validation
    if (!(email && password && firstname && lastname && regNo)) {
      //after send code does not run again
      res.status(400).send("ALL FIELDS ARE REQUIRED");
    } else {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).send("USER ALREADY EXISTS");
      } else {
        //since we encrypt password using algorithms hence we need to add await sign

        let myEncPassword = await bcrypt.hash(password, 10);
        let user = await User.create({
          email: email.toLowerCase(),
          password: myEncPassword,
          firstname,
          lastname,
          regNo,
        });
        //since passoword is undefined it does'nt show up on the frontend.
        user.password = undefined;
        res.status(200).json(user);
      }
    }
    //TOKEN SYSTEM BACKEND
    //Expiring the token is important so if a attacker attacks so they expire the
    // HEADER - PAYLOAD - SIGNATURE (Parts of Token)
    // create a new token
  } catch (err) {
    console.log(err);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      res.status(400).json("Field is missing");
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json("You are not registered in the Database");
      }
      const comparePassword = await bcrypt.compare(password, user.password);
      if (user && comparePassword) {
        const token = jwt.sign(
          {
            user_id: user.id,
            email,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "7d",
          }
        );
        user.token = token;
        user.password = undefined;
        //res.status(200).json(user)
        //if you want to use cookies only use web

        // if you want to use cookies
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 3600 * 1000),
          httpOnly: true,
          //allow cookie to be read by backend only not on the frontend server
        };
        //some applications can't handle cookies so we add json response
        res.status(200).cookie("token", token, options).json({
          success: true,
          token: token,
          user: user,
        });
      } else {
        res.status(400).json("Authentication Not Successful");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.addAvatar = async (req, res) => {
  try {
    const _id  = req.params.id;

    // Check if the user ID is provided
    if (!_id) {
      return res.status(400).json({ error: "User ID is missing" });
    }

    // Ensure that an avatar image file has been uploaded
    if (!req.files || !req.files.avatarImage) {
      return res.status(400).json({ error: "Avatar image is required" });
    }

    const avatarImageFile = req.files.avatarImage;

    // Upload the event image to Cloudinary
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(
      avatarImageFile.tempFilePath
    );

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { avatar: cloudinaryResponse.secure_url },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.logout = async (req, res) => {
  cookie = req.cookies;
  res.cookie("token", "", { expires: new Date(0) });
  res.status(200).json({ success: true });
};

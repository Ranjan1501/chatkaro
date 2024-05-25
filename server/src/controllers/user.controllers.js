import User from "../model/user.model.js";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
export const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY);
};

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find().lean().exec();

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ error: "Error on server" });
  }
};

export const userById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findOne(id);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ error: "Error on server" });
  }
};

export const registerUser = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    })
      .lean()
      .exec();
    if (user)
      return res.status(400).json({
        status: "failed",
        message: " Please provide a different email address",
      });

    user = await User.create(req.body);

    const token = newToken(user);

    res.status(201).json({ user, token });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status(400).json({
        status: "failed",
        message: " Please provide correct email address and password",
      });

    const match = await user.checkPassword(req.body.password);

    if (!match)
      return res.status(400).json({
        status: "failed",
        message: " Please provide correct email address and password",
      });
    const token = newToken(user);

    res.status(201).json({
      user,
      token,
      message: "You have successfully logged in",
    });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
};


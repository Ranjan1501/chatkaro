import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const URI = process.env.MONGO_URI;
export const connect = () => {
  // console.log("uri", URI);
  return mongoose.connect(URI, {});
};
// module.exports = { connect };

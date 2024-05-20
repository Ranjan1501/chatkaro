import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_ACCESS_KEY, function (err, token) {
      if (err) return reject(err);
      return resolve(token);
    });
  });
};

export const authenticateUser = async (req, res, next) => {
  const bearerToken = req?.headers?.authorisation;
  if (!bearerToken || bearerToken.startsWith("Bearer")) {
    res.status(400).json({
      status: "failed",
      message: "Token is missing",
    });
  }
  const token = bearerToken.split(" ")[1];
  let user;
  try {
    user = await verifyToken(token);
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Invalid token",
    });
  }

  // if no user found then we will throw an error
  if (!user)
    return res.status(400).json({
      status: "failed",
      message: " Please provide a valid token",
    });

  // else attach the user to the req body
  req.user = user;
  return next();
};

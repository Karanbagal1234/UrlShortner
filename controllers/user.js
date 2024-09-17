// Description: All user related routes are defined here
import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { CustomError } from "./errorHandler.js";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    //   // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("user existed");

      throw new CustomError("User already exists", 409);
    }

    //   // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    //   // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      con: password,
    });

    //   // Create JWT token
    const token = jwt.sign({ ...newUser._doc }, process.env.SECRET_KEY, {
      expiresIn: "1y",
    });

    //   // Return token in response (no cookie)
    res.status(201).json({
      token,
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new CustomError("User does not exist", 404);
    }
    console.log("user existed");

    // Check if password is correct
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      throw new CustomError("Invalid credentials", 400);
    }
    console.log("password match");

    const token = jwt.sign({ ...existingUser._doc }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    res.status(200).json({
      token,
      success: true,
      message: "User logged in",
    });
  } catch (error) {
    next(error);
  }
};

import { Urls } from "../models/urlshortner.js";
import { CustomError } from "./errorHandler.js";

// Function to get user-specific URL data
const getUserData = async (userId) => {
  try {
    let data = await Urls.find({ User: userId });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

// Controller to handle request and send response
export const getAllUrls = async (req, res,next) => {
  try {
    let userUrls = await getUserData(req.userId._id);
    if(!userUrls) {
      throw new CustomError("No data found",500);
    }
    res.json(userUrls);
  } catch (error) {
    next(error)
  }
};

import jwt from "jsonwebtoken";
import { CustomError } from "./errorHandler.js";

export const isAuthenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new CustomError("Access denied. No token provided.", 401);
    
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.userId = decoded;

    console.log('pass request');
    

    next();
  } catch (error) {
    next(error);
  }
};

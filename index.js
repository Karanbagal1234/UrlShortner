import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import urlRouter from "./routes/urls.js";
import AdminPanel from "./routes/admin.js";
import { connect } from "./dbConnect.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { isAuthenticate } from "./controllers/isAuthorize.js";
import { idHandler } from "./controllers/idHandler.js";
import { CustomError } from "./controllers/errorHandler.js";

dotenv.config({ path: "./.env" });

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.Frontendurl,
    credentials: true,
  })
);
app.use(cookieParser());

// Connect to the database
connect();
console.log(process.env.DB_URI);

// Route handling
app.use("/auth", userRouter);
app.use("/id", urlRouter);
app.use("/api",AdminPanel)



app.set("view engine", "ejs");


app.get("/", isAuthenticate, async (req, res) => {
  if (!req.userId) {
    return res.status(200).json({ log: false });
  }

  res.status(200).json({ ...req.userId });
});
app.use("*", (req, res, next) => {
  console.log(`${req.url} not found ${req.method}`);

  next(new CustomError("Route not found", 404));
});

app.use((err, req, res, next) => {
  err.message = err.message || "Something went wrong";
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({ message: err.message });
});

export default app;

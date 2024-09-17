import { isAuthenticate } from "../controllers/isAuthorize.js";
import { ShorturlConverter } from "../controllers/ShorturlConverter.js";
import { Router } from "express";
import { idHandler } from "../controllers/idHandler.js";

const router = Router();

// Chain routes using method chaining
router
  .post("/url", isAuthenticate, ShorturlConverter)
  .get("/urls/:id", idHandler);

export default router;


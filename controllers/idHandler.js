import { Urls } from "../models/urlshortner.js"; // Ensure the correct path and file extension
import { CustomError } from "./errorHandler.js";

export const idHandler = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new CustomError("ID is required.", 400));
  }

  try {
    const requestUrl = await Urls.findOne({ ShortID: id });

    if (!requestUrl) {
      return next(new CustomError("URL not found.", 404));
    }
    console.log(requestUrl);

    res.status(200).json({ url: requestUrl.OrignalUrl });
  } catch (error) {
    next(error);
  }
};

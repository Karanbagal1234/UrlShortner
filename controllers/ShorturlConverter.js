import { Urls } from '../models/urlshortner.js';
import { CustomError } from './errorHandler.js';

export const ShorturlConverter = async (req, res,next) => {
  console.log("functiom triggger");
  
  try {
    
    const { OrignalUrl } = req.body;
    
    console.log(OrignalUrl);
    
    if (!OrignalUrl) {
      throw new CustomError("Original URL is required.", 400);
      
    }

    const data = await Urls.create({
      User:req.userId,
      OrignalUrl,
    });

    res.status(201).json({ success: true, shortID:  process.env.REDIRECTURL+data.ShortID });
  } catch (error) {
 next(error)
  }
};

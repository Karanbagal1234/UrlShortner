
import express from 'express';
import { Urls } from '../models/urlshortner.js';
import User from '../models/user.js';
import { CustomError } from '../controllers/errorHandler.js';


const router = express();



router.post('/validate', (req, res) => {
    const { password } = req.body;
    if (password === process.env.adminPass) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });



// Route 1: Get URLs Created in the Last 24 Hours
router.get('/urls/last24h', async (req, res) => {
  try {
    const last24Hours = new Date();
    last24Hours.setHours(last24Hours.getHours() - 24);

    const urls = await Urls.find({ createdAt: { $gte: last24Hours } });
    res.json({ count: urls.length, urls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route 2: User Growth (New Users Per Month)
router.get('/users/growth', async (req, res,next) => {
  try {
    const userGrowth = await User.aggregate([
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(userGrowth);
  } catch (error) {
    next(new CustomError('server error',500))
  }
});

// Route 3: Monthly Clicks on URLs
router.get('/urls/monthly', async (req, res,next) => {
  try {
    const monthlyClicks = await Urls.aggregate([
      { $unwind: '$clicks' },
      {
        $group: {
          _id: { $month: '$clicks.timestamp' },
          clicks: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(monthlyClicks);
  } catch (error) {
    next(new CustomError('server error',500))
  }
});

// Route 4: Get Total Clicks and URL Data
router.get('/urls/clicks', async (req, res,next) => {
  try {
    const urlData = await Urls.aggregate([
      {
        $project: {
          _id: 0,
          ShortID: 1,
          OrignalUrl: 1,
          totalClicks: { $size: '$clicks' }
        }
      }
    ]);

    res.json(urlData);
  } catch (error) {
    next(new CustomError('server error',500))
  }
});

// Route 5: Get URLs Created By Month
router.get('/urls/created/monthly', async (req, res,next) => {
  try {
    const monthlyUrls = await Urls.aggregate([
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(monthlyUrls);
  } catch (error) {
next(new CustomError('server error',500))
  }
});






export default router;
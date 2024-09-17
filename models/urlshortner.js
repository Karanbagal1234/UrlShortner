import mongoose from 'mongoose';
import shortid from 'shortid';

// Define the schema
const urlSchema = mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Name of the User model
    required: true
  },
  ShortID: {
    type: String,
    unique: true,
    required: true,
    default: shortid.generate,
  },
  OrignalUrl: {
    type: String,
    required: true,
    
  },
  clicks: [{ timestamp: { type: Date, default: Date.now } }],
});


// Create and export the model
export const Urls = mongoose.model('Url', urlSchema);

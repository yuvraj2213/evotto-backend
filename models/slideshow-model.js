const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { 
    type: String, 
    required: true 
  },
  altText: { 
    type: String, 
    default: 'Slideshow Image' 
  },
  publicId: { 
    type: String, 
    required: true // Store Cloudinary public ID
  },
  createdAt: { 
    type: Date, 
    default: Date.now // Optional: Track when the image was uploaded
  },
});

const Slideshow = mongoose.model('Slideshow', imageSchema);

module.exports = Slideshow;

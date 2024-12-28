const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  altText: { type: String, default: 'Slideshow Image' }, 
});

const Slideshow = mongoose.model('Slideshow', imageSchema);

module.exports = Slideshow;

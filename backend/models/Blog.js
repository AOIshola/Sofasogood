const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,  // This will store the image path (e.g., "/jpegs/toa-heftiba.jpg")
  },
  repost: {
    type: Number,
    default: 0,
  },
  comment: {
    type: Number,
    default: 0,
  },
  detail: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tags: [
    {
      type: String,
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);

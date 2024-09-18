const express = require('express');
const {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
} = require('../controllers/blogController');
const { authenticate } = require('../middleware/authentication');
const router = express.Router();

router.route('/')
  .post(authenticate, createBlog)
  .get(getBlogs);

router.route('/:id')
  .get(getBlogById)
  .put(authenticate, updateBlog)
  .delete(authenticate, deleteBlog);

module.exports = router;

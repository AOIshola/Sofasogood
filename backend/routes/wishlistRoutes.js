const express = require('express');
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistController');
const { authenticate } = require('../middleware/authentication');
const router = express.Router();

router.route('/')
  .get(authenticate, getWishlist);

router.route('/:productId')
  .post(authenticate, addToWishlist)
  .delete(authenticate, removeFromWishlist);

module.exports = router;

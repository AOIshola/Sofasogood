const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authentication');

const {
  createReview,
  getAllReviews,
  getSingleReview,
  getSingleProductReviews,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

router.route('/').post(authenticate, createReview).get(getAllReviews);

router
  .route('/:id')
  .get(getSingleReview)
  .put(authenticate, updateReview)
  .delete(authenticate, deleteReview);

router.route('/product/:id').get(getSingleProductReviews);

module.exports = router;
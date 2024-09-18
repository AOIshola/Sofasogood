const Review = require('../models/Review');
const Product = require('../models/Product');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const checkPermissions = require('../utils/checkPermissions');

const createReview = async (req, res, next) => {
  try {
    const { product: productId } = req.body;
  
    const isValidProduct = await Product.findOne({ _id: productId });
  
    if (!isValidProduct) {
      res.status(StatusCodes.NOT_FOUND).json({msg: `No product with id : ${productId}`})
      throw new CustomError.NotFoundError(`No product with id : ${productId}`);
    }
  
    const alreadySubmitted = await Review.findOne({
      product: productId,
      user: req.user._id,
    });
  
    if (alreadySubmitted) {
      res.status(StatusCodes.BAD_REQUEST).json({msg: 'Already submitted review for this product'})
      throw new CustomError.BadRequestError(
        'Already submitted review for this product'
      );
    }
  
    req.body.user = req.user._id;
    const review = await Review.create(req.body);
    res.status(StatusCodes.CREATED).json({ review });
  } catch (error) {
    next(error);
  }
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({}).populate({
    path: 'product',
    select: 'name imageUrl price',
  }).populate({
    path: 'user',
    select: 'name',
  });

  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

const getSingleReview = async (req, res, next) => {
  try {
    const { id: reviewId } = req.params;
  
    const review = await Review.findOne({ _id: reviewId });
  
    if (!review) {
      res.status(StatusCodes.NOT_FOUND).json({msg: `No review with id ${reviewId}`})
      throw new CustomError.NotFoundError(`No review with id ${reviewId}`);
    }
  
    res.status(StatusCodes.OK).json({ review });
  } catch (error) {
    next(error);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const { id: reviewId } = req.params;
    const { rating, title, comment } = req.body;
  
    const review = await Review.findOne({ _id: reviewId });
  
    if (!review) {
      res.status(StatusCodes.NOT_FOUND).json({msg: `No review with id ${reviewId}`})
      throw new CustomError.NotFoundError(`No review with id ${reviewId}`);
    }
  
    checkPermissions(req.user, review.user);
  
    review.rating = rating;
    review.title = title;
    review.comment = comment;
  
    await review.save();
    res.status(StatusCodes.OK).json({ review });
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const { id: reviewId } = req.params;
  
    const review = await Review.findOne({ _id: reviewId });
  
    if (!review) {
      res.status(StatusCodes.NOT_FOUND).json({msg: `No review with id ${reviewId}`})
      throw new CustomError.NotFoundError(`No review with id ${reviewId}`);
    }
  
    checkPermissions(req.user, review.user);
    await review.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success! Review removed' });
  } catch (error) {
    next(error);
  }
};

const getSingleProductReviews = async (req, res) => {
  const { id: productId } = req.params;
  const reviews = await Review.find({ product: productId }).populate(
    {path: 'user', select: 'name'}
  );
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
};
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 2 } = req.query;
  
    const products = await Product.find({})
      .skip((page - 1) * limit)
      .limit(Number(limit));
  
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);
  
    res.status(StatusCodes.OK).json({
      products,
      count: products.length,
      totalPages,
      currentPage: Number(page),
      totalProducts,
    });
  } catch (error) {
    next(error);
  }
};
  

const getSingleProduct = async (req, res, next) => {
  try {
    const { id: productId } = req.params;
  
    const product = await Product.findOne({ _id: productId }).populate('reviews');
  
    if (!product) {
      res.status(StatusCodes.NOT_FOUND).json({msg: `No product with id : ${productId}`});
      throw new CustomError.NotFoundError(`No product with id : ${productId}`);
    }
  
    res.status(StatusCodes.OK).json({ product });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
  
    const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
      new: true,
      runValidators: true,
    });
  
    if (!product) {
      res.status(StatusCodes.NOT_FOUND).json({msg: `No product with id : ${productId}`});
      throw new CustomError.NotFoundError(`No product with id : ${productId}`);
    }
  
    res.status(StatusCodes.OK).json({ product });
  } catch (error) {
    
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
  
    const product = await Product.findOne({ _id: productId });
  
    if (!product) {
      res.status(StatusCodes.NOT_FOUND).json({msg: `No product with id : ${productId}`});
      throw new CustomError.NotFoundError(`No product with id : ${productId}`);
    }
  
    await product.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success! Product removed.' });
  } catch (error) {
    next(error);
  }
};

const uploadImage = async (req, res, next) => {
  try {
    if (!req.files) {
      res.status(StatusCodes.BAD_REQUEST).json({msg: 'No File Uploaded'});
      throw new CustomError.BadRequestError('No File Uploaded');
    }
    const productImage = req.files.image;
  
    if (!productImage.mimetype.startsWith('image')) {
      res.status(StatusCodes.BAD_REQUEST).json({msg: 'Please Upload Image'});
      throw new CustomError.BadRequestError('Please Upload Image');
    }
  
    const maxSize = 1024 * 1024;
  
    if (productImage.size > maxSize) {
      res.status(StatusCodes.BAD_REQUEST).json({msg: 'Please upload image smaller than 1MB'});
      throw new CustomError.BadRequestError(
        'Please upload image smaller than 1MB'
      );
    }
  
    const imagePath = path.join(
      __dirname,
      '../public/uploads/' + `${productImage.name}`
    );
    await productImage.mv(imagePath);
    res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};

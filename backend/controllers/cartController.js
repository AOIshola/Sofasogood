const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const addToCart = async (req, res, next) => {
  // console.log(req.body)
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;
  
    const product = await Product.findById(productId);
    if (!product) {
      res.status(StatusCodes.NOT_FOUND).json({msg: `No product with id: ${productId}`});
      throw new CustomError.NotFoundError(`No product with id: ${productId}`);
    }
  
    let cart = await Cart.findOne({ user: userId });
  
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
  
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }
  
    await cart.save();
  
    res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    next(error);
  }
};

const getCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
  
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
  
    if (!cart) {
      return res.status(StatusCodes.NOT_FOUND).json({msg: 'No cart found for this user.'});
      // throw new CustomError.NotFoundError('No cart found for this user.');
    }
  
    res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    next(error);
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    const { id: productId } = req.params;
    const userId = req.user._id;
  
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      res.status(StatusCodes.NOT_FOUND).json({msg: 'No cart found for this user.'});
      throw new CustomError.NotFoundError('No cart found for this user.');
    }
  
    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
  
    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      await cart.save();
      res.status(StatusCodes.OK).json({ msg: 'Product removed from cart' });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({msg: `No product with id: ${productId} found in cart.`});
      throw new CustomError.NotFoundError(`No product with id: ${productId} found in cart.`);
    }
  } catch (error) {
    next(error);
  }
};

const updateCartItemQuantity = async (req, res, next) => {
  try {
    // console.log(req.body)
    const { productId, quantity } = req.body;
    const userId = req.user._id;
  
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      res.status(StatusCodes.NOT_FOUND).json({msg: 'No cart found for this user.'});
        throw new CustomError.NotFoundError('No cart found for this user.');
    }
  
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        res.status(StatusCodes.OK).json({ cart });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({msg: 'Product not found in cart.'});
        throw new CustomError.NotFoundError('Product not found in cart.');
    }
  } catch (error) {
    next(error);
  }
};

const clearCart = async (req, res) => {
  const userId = req.user._id;
  await Cart.deleteOne({ user: userId });
  res.status(StatusCodes.OK).json({ message: 'Cart cleared.' });
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
};

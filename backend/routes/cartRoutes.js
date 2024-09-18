const express = require('express');
const { getCart,
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItemQuantity
} = require('../controllers/cartController');
const { authenticate } = require('../middleware/authentication');

const router = express.Router();

router.route('/')
  .post(authenticate, addToCart)
  .get(authenticate, getCart)
  .delete(authenticate, clearCart)
  .put(authenticate, updateCartItemQuantity);

// router.put('/cart', authenticate, updateCartItemQuantity);
// router.delete('/cart', authenticate, clearCart);
// router.delete('/:id', authenticate, removeFromCart);
  
router.route('/:id')
  .delete(authenticate, removeFromCart);
  
module.exports = router;

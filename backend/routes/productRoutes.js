const express = require('express');
const { 
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require('../controllers/productController');

const {
    authenticate,
    authorizePermissions
} = require('../middleware/authentication');

const router = express.Router();

router.route('/')
    .get(getAllProducts)
    .post([authenticate, authorizePermissions('admin')], createProduct);

router.route('/uploadImage')
    .post([authenticate, authorizePermissions('admin')], uploadImage);

router.route('/:id')
    .get(getSingleProduct)
    .put([authenticate, authorizePermissions('admin')], updateProduct)
    .delete([authenticate, authorizePermissions('admin')], deleteProduct);

module.exports = router;
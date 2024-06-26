const express = require('express');
const { createProduct, getAllProducts, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteProductReview, getAllProductsAdmin } = require('../controller/productController');
const { isAuthenticated, authorizedRoles } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/product/new').post(isAuthenticated,authorizedRoles('admin'),createProduct)

router.route('/products').get(getAllProducts)

router.route('/adminproducts').get(isAuthenticated,authorizedRoles('admin'),getAllProductsAdmin)

router.route('/product/:id').put(isAuthenticated,authorizedRoles('admin'),updateProduct).delete(isAuthenticated,authorizedRoles('admin'),deleteProduct).get(getProductDetails)

router.route('/review').put(isAuthenticated,createProductReview)

router.route('/getReviews').get(getProductReviews)

router.route('/deleteReview').delete(isAuthenticated, deleteProductReview);





module.exports = router;
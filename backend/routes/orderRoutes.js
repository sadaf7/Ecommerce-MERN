const express = require('express');
const { newOrder, getSingleOrder, myOrder, getAllOrders, updateOrderStatus, deleteOrder } = require('../controller/orderController');
const { isAuthenticated, authorizedRoles } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/new').post(isAuthenticated,newOrder)

router.route('/singleOrder/:id').get(isAuthenticated,getSingleOrder)

router.route('/myOrder').get(isAuthenticated,myOrder)

router.route('/allOrders').get(isAuthenticated,authorizedRoles('admin'),getAllOrders)

router.route('/updateStatus/:id').put(isAuthenticated,authorizedRoles('admin'),updateOrderStatus)

router.route('/deleteOrder/:id').delete(isAuthenticated,authorizedRoles('admin'),deleteOrder)

module.exports = router;
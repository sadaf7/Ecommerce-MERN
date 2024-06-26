const express = require('express');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const { processPayment, sendApiKey } = require('../controller/paymentController');
const router = express.Router();

router.route('/payment/process').post(isAuthenticated,processPayment)
router.route('/stripeApi').get(isAuthenticated,sendApiKey)

module.exports = router;
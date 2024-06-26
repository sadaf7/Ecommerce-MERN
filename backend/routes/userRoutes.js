const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getUser, deleteUser, updateUserRole } = require('../controller/userController');
const { isAuthenticated, authorizedRoles } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/register').post(registerUser)

router.route('/login').post(loginUser)

router.route('/password/forgot').post(forgotPassword)

router.route('/password/reset/:token').post(resetPassword)

router.route('/logout').get(logout)

router.route('/me').get(isAuthenticated,getUserDetails)

router.route('/password/update').put(isAuthenticated,updatePassword)

router.route('/me/update').put(isAuthenticated,updateProfile)

router.route('/alluser').get(isAuthenticated,authorizedRoles('admin'),getAllUsers)

router.route('/user/:id').get(isAuthenticated,authorizedRoles('admin'),getUser)

router.route('/user/:id').put(isAuthenticated,authorizedRoles('admin'),updateUserRole)

router.route('/user/:id').delete(isAuthenticated,authorizedRoles('admin'),deleteUser)

module.exports = router;
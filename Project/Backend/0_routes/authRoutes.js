const express = require('express')

const authController = require('../2_controllers/authController')
const asyncHandler = require('../5_utils/asyncHandler')

const router = express.Router()

//basic auth routes for users
router.post('/token', asyncHandler(authController.refreshToken))
router.get('/users', asyncHandler(authController.getUsers))
router.post('/users/register', asyncHandler(authController.registerUser))
router.delete('/users/logout', asyncHandler(authController.logoutUser))
router.post('/users/login', asyncHandler(authController.loginUser))

module.exports = router

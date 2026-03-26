const express = require('express')

const authController = require('../controllers/authController')
const asyncHandler = require('../utils/asyncHandler')

const router = express.Router()

router.post('/token', asyncHandler(authController.refreshToken))
router.get('/users', authController.getUsers)
router.post('/users/register', asyncHandler(authController.registerUser))
router.delete('/users/logout', asyncHandler(authController.logoutUser))
router.post('/users/login', asyncHandler(authController.loginUser))

module.exports = router

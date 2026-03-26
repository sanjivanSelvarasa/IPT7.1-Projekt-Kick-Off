const express = require('express')

const portfolioController = require('../controllers/portfolioController')
const authenticateToken = require('../middleware/authenticateToken')

const router = express.Router()

router.get('/portfolios', authenticateToken, portfolioController.getPortfolios)

module.exports = router

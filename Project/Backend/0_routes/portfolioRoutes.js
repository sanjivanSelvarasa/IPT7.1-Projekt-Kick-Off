const express = require('express')

const portfolioController = require('../2_controllers/portfolioController')
const authenticateToken = require('../1_middleware/authenticateToken')
const asyncHandler = require('../5_utils/asyncHandler')

const router = express.Router()

router.get('/portfolios', authenticateToken, asyncHandler(portfolioController.getPortfolios))
router.post('/portfolios', authenticateToken, asyncHandler(portfolioController.createEmptyPortfolio))
router.get('/portfolio', authenticateToken, asyncHandler(portfolioController.getPortfolios))
router.post('/portfolio', authenticateToken, asyncHandler(portfolioController.createEmptyPortfolio))
router.post('/portfolios/default', authenticateToken, asyncHandler(portfolioController.createEmptyPortfolio))

module.exports = router

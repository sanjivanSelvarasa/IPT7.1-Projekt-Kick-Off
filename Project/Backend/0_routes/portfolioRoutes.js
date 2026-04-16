const express = require('express')

const portfolioController = require('../2_controllers/portfolioController')
const authenticateToken = require('../1_middleware/authenticateToken')
const asyncHandler = require('../5_utils/asyncHandler')

const router = express.Router()

// Alle Portfolios des angemeldeten Benutzers abrufen
router.get('/portfolios', authenticateToken, asyncHandler(portfolioController.getPortfolios))

// Portfolio erstellen
router.post('/portfolio', authenticateToken, asyncHandler(portfolioController.createPortfolio))

// Einzelnes Portfolio lesen
router.get('/portfolio/:id', authenticateToken, asyncHandler(portfolioController.getPortfolioById))

// Portfolio aktualisieren
router.put('/portfolio/:id', authenticateToken, asyncHandler(portfolioController.updatePortfolio))

// Portfolio löschen
router.delete('/portfolio/:id', authenticateToken, asyncHandler(portfolioController.deletePortfolio))

module.exports = router

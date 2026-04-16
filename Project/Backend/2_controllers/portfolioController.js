const portfolioService = require('../3_services/portfolioService')

// GET /portfolios – alle Portfolios des angemeldeten Benutzers
async function getPortfolios(req, res) {
    const portfolios = await portfolioService.getPortfoliosForUser(req.user.email)
    res.json(portfolios)
}

// POST /portfolio – neues Portfolio erstellen
async function createPortfolio(req, res) {
    const portfolio = await portfolioService.createPortfolio(req.user.email, req.body)
    res.status(201).json(portfolio)
}

// GET /portfolio/:id – einzelnes Portfolio lesen
async function getPortfolioById(req, res) {
    const portfolio = await portfolioService.getPortfolioById(req.user.email, req.params.id)
    res.json(portfolio)
}

// PUT /portfolio/:id – Portfolio aktualisieren
async function updatePortfolio(req, res) {
    const portfolio = await portfolioService.updatePortfolio(req.user.email, req.params.id, req.body)
    res.json(portfolio)
}

// DELETE /portfolio/:id – Portfolio löschen
async function deletePortfolio(req, res) {
    await portfolioService.deletePortfolio(req.user.email, req.params.id)
    res.sendStatus(204)
}

module.exports = {
    getPortfolios,
    createPortfolio,
    getPortfolioById,
    updatePortfolio,
    deletePortfolio
}

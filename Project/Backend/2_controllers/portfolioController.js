const portfolioService = require('../3_services/portfolioService')

async function getPortfolios(req, res) {
    const portfolios = await portfolioService.getPortfoliosForUser(req.user.email)
    res.json(portfolios)
}

async function createEmptyPortfolio(req, res) {
    const portfolio = await portfolioService.createEmptyPortfolioForUser(req.user.email)
    res.status(201).json(portfolio)
}

module.exports = {
    getPortfolios,
    createEmptyPortfolio
}

const portfolioService = require('../services/portfolioService')

function getPortfolios(req, res) {
    const portfolios = portfolioService.getPortfoliosForUser(req.user.email)
    res.json(portfolios)
}

module.exports = {
    getPortfolios
}

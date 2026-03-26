const portfolioModel = require('../models/portfolioModel')

function getPortfoliosForUser(email) {
    return portfolioModel.getPortfoliosByEmail(email)
}

module.exports = {
    getPortfoliosForUser
}

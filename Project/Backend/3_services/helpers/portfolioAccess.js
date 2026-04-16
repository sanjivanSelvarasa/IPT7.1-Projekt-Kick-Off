const ApiError = require('../../5_utils/ApiError')
const { parseId } = require('../../5_utils/validators')
const portfolioModel = require('../../4_models/portfolioModel')

async function findUserOrThrow(email) {
    const user = await portfolioModel.findUserByEmail(email)
    if (!user) {
        throw new ApiError(404, 'Benutzer nicht gefunden.')
    }

    return user
}

function assertOwnership(portfolio, userId) {
    if (portfolio.userId !== userId) {
        throw new ApiError(403, 'Kein Zugriff auf dieses Portfolio.')
    }
}

async function getOwnedPortfolio(email, rawPortfolioId) {
    const user = await findUserOrThrow(email)
    const portfolioId = parseId(rawPortfolioId, 'Portfolio-ID')

    const portfolio = await portfolioModel.getPortfolioById(portfolioId)
    if (!portfolio) {
        throw new ApiError(404, 'Portfolio nicht gefunden.')
    }

    assertOwnership(portfolio, user.id)
    return portfolio
}

module.exports = {
    findUserOrThrow,
    getOwnedPortfolio
}

const portfolioModel = require('../4_models/portfolioModel')
const ApiError = require('../5_utils/ApiError')

async function findUserOrThrow(email) {
    const user = await portfolioModel.findUserByEmail(email)
    if (!user) {
        throw new ApiError(404, 'User not found.')
    }

    return user
}

async function getPortfoliosForUser(email) {
    const user = await findUserOrThrow(email)

    return portfolioModel.getPortfoliosByUserId(user.id)
}

async function createEmptyPortfolioForUser(email) {
    const user = await findUserOrThrow(email)

    return portfolioModel.createPortfolioForUser(user.id, {
        title: '',
        description: '',
        slug: `${email.split('@')[0]}-${Date.now()}`,
        visibility: 'private'
    })
}

module.exports = {
    getPortfoliosForUser,
    createEmptyPortfolioForUser
}

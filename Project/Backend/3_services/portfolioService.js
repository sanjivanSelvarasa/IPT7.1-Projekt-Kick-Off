const ApiError = require('../5_utils/ApiError')
const {
    parseRequiredText,
    parseOptionalText,
    parseSlug,
    validateVisibility,
    parseId
} = require('../5_utils/validators')
const { findUserOrThrow, getOwnedPortfolio } = require('./helpers/portfolioAccess')
const portfolioModel = require('../4_models/portfolioModel')

function generateSlug(base) {
    return `${base}-${Date.now()}`
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
}

async function getPortfoliosForUser(email) {
    const user = await findUserOrThrow(email)
    return portfolioModel.getPortfoliosByUserId(user.id)
}

async function createPortfolio(email, data) {
    const user = await findUserOrThrow(email)

    const title = parseRequiredText(data?.title, 'Titel', 100)
    const description = parseOptionalText(data?.description, 'Beschreibung', 4000) ?? ''
    const visibility = data?.visibility ?? 'private'
    validateVisibility(visibility)

    const slug = data?.slug
        ? parseSlug(data.slug)
        : generateSlug(email.split('@')[0])

    try {
        return await portfolioModel.createPortfolioForUser(user.id, {
            title,
            description,
            slug,
            visibility
        })
    } catch (error) {
        if (error.number === 2627 || error.number === 2601) {
            throw new ApiError(409, 'Dieser Slug ist bereits vergeben. Bitte wähle einen anderen.')
        }

        throw error
    }
}

async function getPortfolioById(email, rawPortfolioId) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    return portfolio
}

async function updatePortfolio(email, rawPortfolioId, data) {
    const portfolioId = parseId(rawPortfolioId, 'Portfolio-ID')
    const existing = await getOwnedPortfolio(email, portfolioId)

    const title = data?.title !== undefined
        ? parseRequiredText(data.title, 'Titel', 100)
        : existing.title
    const description = data?.description !== undefined
        ? (parseOptionalText(data.description, 'Beschreibung', 4000) ?? '')
        : existing.description
    const visibility = data?.visibility !== undefined ? data.visibility : existing.visibility
    validateVisibility(visibility)

    const slug = data?.slug !== undefined ? parseSlug(data.slug) : existing.slug

    try {
        return await portfolioModel.updatePortfolio(portfolioId, {
            title,
            description,
            slug,
            visibility
        })
    } catch (error) {
        if (error.number === 2627 || error.number === 2601) {
            throw new ApiError(409, 'Dieser Slug ist bereits vergeben. Bitte wähle einen anderen.')
        }

        throw error
    }
}

async function deletePortfolio(email, rawPortfolioId) {
    const portfolioId = parseId(rawPortfolioId, 'Portfolio-ID')
    await getOwnedPortfolio(email, portfolioId)
    await portfolioModel.deletePortfolioById(portfolioId)
}

module.exports = {
    getPortfoliosForUser,
    createPortfolio,
    getPortfolioById,
    updatePortfolio,
    deletePortfolio
}

const ApiError = require('../5_utils/ApiError')
const {
    ensurePayloadObject,
    parseId,
    parseRequiredText,
    parseOptionalText,
    parseOptionalDate,
    parseOptionalSortOrder,
    validateDateRange
} = require('../5_utils/validators')
const { getOwnedPortfolio } = require('./helpers/portfolioAccess')
const experienceModel = require('../4_models/experienceModel')

async function listExperiences(email, rawPortfolioId) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    return experienceModel.getExperiencesByPortfolioId(portfolio.id)
}

async function createExperience(email, rawPortfolioId, data) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    ensurePayloadObject(data)

    const companyName = parseRequiredText(data.companyName, 'Firmenname', 100)
    const position = parseRequiredText(data.position, 'Position', 100)
    const description = parseOptionalText(data.description, 'Beschreibung', 4000)
    const sortOrder = parseOptionalSortOrder(data.sortOrder)
    const startDate = parseOptionalDate(data.startDate, 'Startdatum')
    const endDate = parseOptionalDate(data.endDate, 'Enddatum')
    validateDateRange(startDate, endDate)

    return experienceModel.createExperienceForPortfolio(portfolio.id, {
        companyName,
        position,
        description,
        sortOrder,
        startDate,
        endDate
    })
}

async function updateExperience(email, rawPortfolioId, rawExperienceId, data) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    const experienceId = parseId(rawExperienceId, 'Experience-ID')
    ensurePayloadObject(data)

    const existing = await experienceModel.getExperienceById(experienceId)
    if (!existing || existing.portfolioId !== portfolio.id) {
        throw new ApiError(404, 'Experience nicht gefunden.')
    }

    const companyName = data.companyName !== undefined
        ? parseRequiredText(data.companyName, 'Firmenname', 100)
        : existing.companyName
    const position = data.position !== undefined
        ? parseRequiredText(data.position, 'Position', 100)
        : existing.position
    const description = data.description !== undefined
        ? parseOptionalText(data.description, 'Beschreibung', 4000)
        : existing.description
    const sortOrder = data.sortOrder !== undefined
        ? parseOptionalSortOrder(data.sortOrder)
        : existing.sortOrder
    const startDate = data.startDate !== undefined
        ? parseOptionalDate(data.startDate, 'Startdatum')
        : existing.startDate
    const endDate = data.endDate !== undefined
        ? parseOptionalDate(data.endDate, 'Enddatum')
        : existing.endDate
    validateDateRange(startDate, endDate)

    return experienceModel.updateExperience(experienceId, {
        companyName,
        position,
        description,
        sortOrder,
        startDate,
        endDate
    })
}

async function deleteExperience(email, rawPortfolioId, rawExperienceId) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    const experienceId = parseId(rawExperienceId, 'Experience-ID')

    const existing = await experienceModel.getExperienceById(experienceId)
    if (!existing || existing.portfolioId !== portfolio.id) {
        throw new ApiError(404, 'Experience nicht gefunden.')
    }

    await experienceModel.deleteExperienceById(experienceId)
}

module.exports = {
    listExperiences,
    createExperience,
    updateExperience,
    deleteExperience
}

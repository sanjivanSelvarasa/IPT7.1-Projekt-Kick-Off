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
const educationModel = require('../4_models/educationModel')

async function listEducations(email, rawPortfolioId) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    return educationModel.getEducationsByPortfolioId(portfolio.id)
}

async function createEducation(email, rawPortfolioId, data) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    ensurePayloadObject(data)

    const institutionName = parseRequiredText(data.institutionName, 'Institution', 100)
    const degree = parseRequiredText(data.degree, 'Abschluss', 100)
    const fieldOfStudy = parseOptionalText(data.fieldOfStudy, 'Studienfach', 100)
    const sortOrder = parseOptionalSortOrder(data.sortOrder)
    const startDate = parseOptionalDate(data.startDate, 'Startdatum')
    const endDate = parseOptionalDate(data.endDate, 'Enddatum')
    validateDateRange(startDate, endDate)

    return educationModel.createEducationForPortfolio(portfolio.id, {
        institutionName,
        degree,
        fieldOfStudy,
        sortOrder,
        startDate,
        endDate
    })
}

async function updateEducation(email, rawPortfolioId, rawEducationId, data) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    const educationId = parseId(rawEducationId, 'Education-ID')
    ensurePayloadObject(data)

    const existing = await educationModel.getEducationById(educationId)
    if (!existing || existing.portfolioId !== portfolio.id) {
        throw new ApiError(404, 'Education nicht gefunden.')
    }

    const institutionName = data.institutionName !== undefined
        ? parseRequiredText(data.institutionName, 'Institution', 100)
        : existing.institutionName
    const degree = data.degree !== undefined
        ? parseRequiredText(data.degree, 'Abschluss', 100)
        : existing.degree
    const fieldOfStudy = data.fieldOfStudy !== undefined
        ? parseOptionalText(data.fieldOfStudy, 'Studienfach', 100)
        : existing.fieldOfStudy
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

    return educationModel.updateEducation(educationId, {
        institutionName,
        degree,
        fieldOfStudy,
        sortOrder,
        startDate,
        endDate
    })
}

async function deleteEducation(email, rawPortfolioId, rawEducationId) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    const educationId = parseId(rawEducationId, 'Education-ID')

    const existing = await educationModel.getEducationById(educationId)
    if (!existing || existing.portfolioId !== portfolio.id) {
        throw new ApiError(404, 'Education nicht gefunden.')
    }

    await educationModel.deleteEducationById(educationId)
}

module.exports = {
    listEducations,
    createEducation,
    updateEducation,
    deleteEducation
}

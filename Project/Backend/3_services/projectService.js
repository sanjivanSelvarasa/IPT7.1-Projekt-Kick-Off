const ApiError = require('../5_utils/ApiError')
const {
    ensurePayloadObject,
    parseId,
    parseRequiredText,
    parseOptionalText,
    parseOptionalDate,
    parseOptionalUrl,
    parseOptionalSortOrder,
    validateDateRange
} = require('../5_utils/validators')
const { getOwnedPortfolio } = require('./helpers/portfolioAccess')
const projectModel = require('../4_models/projectModel')

async function listProjects(email, rawPortfolioId) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    return projectModel.getProjectsByPortfolioId(portfolio.id)
}

async function createProject(email, rawPortfolioId, data) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    ensurePayloadObject(data)

    const title = parseRequiredText(data.title, 'Projekt-Titel', 100)
    const description = parseOptionalText(data.description, 'Projekt-Beschreibung', 4000)
    const imageUrl = parseOptionalUrl(data.imageUrl, 'Bild-URL')
    const projectUrl = parseOptionalUrl(data.projectUrl, 'Projekt-URL')
    const githubUrl = parseOptionalUrl(data.githubUrl, 'GitHub-URL')
    const sortOrder = parseOptionalSortOrder(data.sortOrder)
    const startDate = parseOptionalDate(data.startDate, 'Projekt-Startdatum')
    const endDate = parseOptionalDate(data.endDate, 'Projekt-Enddatum')
    validateDateRange(startDate, endDate)

    return projectModel.createProjectForPortfolio(portfolio.id, {
        title,
        description,
        imageUrl,
        projectUrl,
        githubUrl,
        sortOrder,
        startDate,
        endDate
    })
}

async function updateProject(email, rawPortfolioId, rawProjectId, data) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    const projectId = parseId(rawProjectId, 'Projekt-ID')
    ensurePayloadObject(data)

    const existing = await projectModel.getProjectById(projectId)
    if (!existing || existing.portfolioId !== portfolio.id) {
        throw new ApiError(404, 'Projekt nicht gefunden.')
    }

    const title = data.title !== undefined
        ? parseRequiredText(data.title, 'Projekt-Titel', 100)
        : existing.title
    const description = data.description !== undefined
        ? parseOptionalText(data.description, 'Projekt-Beschreibung', 4000)
        : existing.description
    const imageUrl = data.imageUrl !== undefined
        ? parseOptionalUrl(data.imageUrl, 'Bild-URL')
        : existing.imageUrl
    const projectUrl = data.projectUrl !== undefined
        ? parseOptionalUrl(data.projectUrl, 'Projekt-URL')
        : existing.projectUrl
    const githubUrl = data.githubUrl !== undefined
        ? parseOptionalUrl(data.githubUrl, 'GitHub-URL')
        : existing.githubUrl
    const sortOrder = data.sortOrder !== undefined
        ? parseOptionalSortOrder(data.sortOrder)
        : existing.sortOrder
    const startDate = data.startDate !== undefined
        ? parseOptionalDate(data.startDate, 'Projekt-Startdatum')
        : existing.startDate
    const endDate = data.endDate !== undefined
        ? parseOptionalDate(data.endDate, 'Projekt-Enddatum')
        : existing.endDate
    validateDateRange(startDate, endDate)

    return projectModel.updateProject(projectId, {
        title,
        description,
        imageUrl,
        projectUrl,
        githubUrl,
        sortOrder,
        startDate,
        endDate
    })
}

async function deleteProject(email, rawPortfolioId, rawProjectId) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    const projectId = parseId(rawProjectId, 'Projekt-ID')

    const existing = await projectModel.getProjectById(projectId)
    if (!existing || existing.portfolioId !== portfolio.id) {
        throw new ApiError(404, 'Projekt nicht gefunden.')
    }

    await projectModel.deleteProjectById(projectId)
}

async function uploadProjectImage(email, rawPortfolioId, rawProjectId, file) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    const projectId = parseId(rawProjectId, 'Projekt-ID')

    const existing = await projectModel.getProjectById(projectId)
    if (!existing || existing.portfolioId !== portfolio.id) {
        throw new ApiError(404, 'Projekt nicht gefunden.')
    }

    if (!file || typeof file.filename !== 'string' || file.filename.trim() === '') {
        throw new ApiError(400, 'Es wurde keine Bilddatei hochgeladen.')
    }

    const imageUrl = `/uploads/projects/${file.filename}`
    const updated = await projectModel.updateProjectImageUrl(projectId, imageUrl)

    return {
        id: updated.id,
        portfolioId: updated.portfolioId,
        imageUrl: updated.imageUrl,
        updatedAt: updated.updatedAt
    }
}

module.exports = {
    listProjects,
    createProject,
    updateProject,
    deleteProject,
    uploadProjectImage
}

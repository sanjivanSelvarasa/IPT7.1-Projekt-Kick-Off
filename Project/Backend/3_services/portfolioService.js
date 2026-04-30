const ApiError = require('../5_utils/ApiError')
const {
    ensurePayloadObject,
    parseRequiredText,
    parseOptionalText,
    parseSlug,
    parseLanguageCode,
    validateVisibility,
    parseId,
    parseOptionalId
} = require('../5_utils/validators')
const { findUserOrThrow, getOwnedPortfolio } = require('./helpers/portfolioAccess')
const portfolioModel = require('../4_models/portfolioModel')
const projectModel = require('../4_models/projectModel')
const skillModel = require('../4_models/skillModel')
const socialLinkModel = require('../4_models/socialLinkModel')
const experienceModel = require('../4_models/experienceModel')
const educationModel = require('../4_models/educationModel')
const themeModel = require('../4_models/themeModel')

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
    ensurePayloadObject(data)

    const title = parseRequiredText(data?.title, 'Titel', 100)
    const description = parseOptionalText(data?.description, 'Beschreibung', 4000) ?? ''
    const visibility = data?.visibility ?? 'private'
    validateVisibility(visibility)
    const templateId = parseOptionalId(data?.template_id, 'Template-ID')
    const languageCode = data?.languageCode !== undefined
        ? parseLanguageCode(data.languageCode)
        : 'de'

    const slug = data?.slug
        ? parseSlug(data.slug)
        : generateSlug(email.split('@')[0])

    try {
        return await portfolioModel.createPortfolioForUser(user.id, {
            title,
            description,
            slug,
            visibility,
            templateId,
            languageCode
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

async function getPortfolioFullById(email, rawPortfolioId) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)

    const [projects, skills, socialLinks, experiences, educations, themes, translations, versions] = await Promise.all([
        projectModel.getProjectsByPortfolioId(portfolio.id),
        skillModel.getPortfolioSkillsByPortfolioId(portfolio.id),
        socialLinkModel.getSocialLinksByPortfolioId(portfolio.id),
        experienceModel.getExperiencesByPortfolioId(portfolio.id),
        educationModel.getEducationsByPortfolioId(portfolio.id),
        themeModel.getThemesByPortfolioId(portfolio.id),
        portfolioModel.getTranslationsByPortfolioId(portfolio.id),
        portfolioModel.getVersionsByPortfolioId(portfolio.id)
    ])

    return {
        portfolio,
        projects,
        skills,
        socialLinks,
        experiences,
        educations,
        themes,
        translations,
        versions
    }
}

async function updatePortfolio(email, rawPortfolioId, data) {
    const portfolioId = parseId(rawPortfolioId, 'Portfolio-ID')
    const existing = await getOwnedPortfolio(email, portfolioId)
    ensurePayloadObject(data)

    const title = data?.title !== undefined
        ? parseRequiredText(data.title, 'Titel', 100)
        : existing.title
    const description = data?.description !== undefined
        ? (parseOptionalText(data.description, 'Beschreibung', 4000) ?? '')
        : existing.description
    const visibility = data?.visibility !== undefined ? data.visibility : existing.visibility
    validateVisibility(visibility)
    const templateId = data?.template_id !== undefined
        ? parseOptionalId(data.template_id, 'Template-ID')
        : existing.templateId
    const languageCode = data?.languageCode !== undefined
        ? parseLanguageCode(data.languageCode)
        : existing.languageCode

    const slug = data?.slug !== undefined ? parseSlug(data.slug) : existing.slug

    try {
        return await portfolioModel.updatePortfolio(portfolioId, {
            title,
            description,
            slug,
            visibility,
            templateId,
            languageCode
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

async function getPublicPortfolioBySlug(slug) {
    const parsedSlug = parseSlug(slug)
    const portfolio = await portfolioModel.getPortfolioBySlug(parsedSlug)
    if (!portfolio || portfolio.visibility !== 'public') {
        throw new ApiError(404, 'Portfolio nicht gefunden.')
    }
    return portfolio
}

async function getPublicPortfolioFullBySlug(slug) {
    const portfolio = await getPublicPortfolioBySlug(slug)

    const [projects, skills, socialLinks, experiences, educations, themes, translations] = await Promise.all([
        projectModel.getProjectsByPortfolioId(portfolio.id),
        skillModel.getPortfolioSkillsByPortfolioId(portfolio.id),
        socialLinkModel.getSocialLinksByPortfolioId(portfolio.id),
        experienceModel.getExperiencesByPortfolioId(portfolio.id),
        educationModel.getEducationsByPortfolioId(portfolio.id),
        themeModel.getThemesByPortfolioId(portfolio.id),
        portfolioModel.getTranslationsByPortfolioId(portfolio.id)
    ])

    return {
        portfolio,
        projects,
        skills,
        socialLinks,
        experiences,
        educations,
        themes,
        translations
    }
}

async function listTranslations(email, rawPortfolioId) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    return portfolioModel.getTranslationsByPortfolioId(portfolio.id)
}

function ensureTranslationLanguageIsAvailable(portfolio, languageCode, existingTranslationId = null) {
    if (portfolio.languageCode && portfolio.languageCode === languageCode) {
        throw new ApiError(409, 'Die Hauptsprache des Portfolios kann nicht als zusätzliche Übersetzung angelegt werden.')
    }

    return portfolioModel.findTranslationByLanguageCode(portfolio.id, languageCode).then(existingTranslation => {
        if (existingTranslation && existingTranslation.id !== existingTranslationId) {
            throw new ApiError(409, 'Für diese Sprache existiert bereits eine Übersetzung.')
        }
    })
}

async function createTranslation(email, rawPortfolioId, data) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    ensurePayloadObject(data)

    const languageCode = parseLanguageCode(data.languageCode)
    const title = parseRequiredText(data.title, 'Titel', 100)
    const description = parseOptionalText(data.description, 'Beschreibung', 4000) ?? ''

    await ensureTranslationLanguageIsAvailable(portfolio, languageCode)

    return portfolioModel.createTranslationForPortfolio(portfolio.id, {
        languageCode,
        title,
        description
    })
}

async function updateTranslation(email, rawPortfolioId, rawTranslationId, data) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    const translationId = parseId(rawTranslationId, 'Übersetzungs-ID')
    ensurePayloadObject(data)

    const existing = await portfolioModel.getTranslationById(translationId)
    if (!existing || existing.portfolioId !== portfolio.id) {
        throw new ApiError(404, 'Übersetzung nicht gefunden.')
    }

    const languageCode = data.languageCode !== undefined
        ? parseLanguageCode(data.languageCode)
        : existing.languageCode
    const title = data.title !== undefined
        ? parseRequiredText(data.title, 'Titel', 100)
        : existing.title
    const description = data.description !== undefined
        ? (parseOptionalText(data.description, 'Beschreibung', 4000) ?? '')
        : existing.description

    await ensureTranslationLanguageIsAvailable(portfolio, languageCode, existing.id)

    return portfolioModel.updateTranslation(translationId, {
        languageCode,
        title,
        description
    })
}

async function deleteTranslation(email, rawPortfolioId, rawTranslationId) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    const translationId = parseId(rawTranslationId, 'Übersetzungs-ID')

    const existing = await portfolioModel.getTranslationById(translationId)
    if (!existing || existing.portfolioId !== portfolio.id) {
        throw new ApiError(404, 'Übersetzung nicht gefunden.')
    }

    await portfolioModel.deleteTranslationById(translationId)
}

async function listVersions(email, rawPortfolioId) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    return portfolioModel.getVersionsByPortfolioId(portfolio.id)
}

async function createVersion(email, rawPortfolioId) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)

    return portfolioModel.createVersionForPortfolio(portfolio.id, {
        titleSnapshot: portfolio.title,
        isPublished: false
    })
}

async function getVersionById(email, rawPortfolioId, rawVersionId) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    const versionId = parseId(rawVersionId, 'Versions-ID')

    const version = await portfolioModel.getVersionById(versionId)
    if (!version || version.portfolioId !== portfolio.id) {
        throw new ApiError(404, 'Version nicht gefunden.')
    }

    return version
}

async function deleteVersion(email, rawPortfolioId, rawVersionId) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    const versionId = parseId(rawVersionId, 'Versions-ID')

    const version = await portfolioModel.getVersionById(versionId)
    if (!version || version.portfolioId !== portfolio.id) {
        throw new ApiError(404, 'Version nicht gefunden.')
    }

    await portfolioModel.clearCurrentVersionIfMatching(portfolio.id, versionId)
    await portfolioModel.deleteVersionById(versionId)
}

async function activateVersion(email, rawPortfolioId, rawVersionId) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    const versionId = parseId(rawVersionId, 'Versions-ID')

    const version = await portfolioModel.getVersionById(versionId)
    if (!version || version.portfolioId !== portfolio.id) {
        throw new ApiError(404, 'Version nicht gefunden.')
    }

    await portfolioModel.setCurrentVersionForPortfolio(portfolio.id, versionId)

    return {
        portfolioId: portfolio.id,
        currentVersionId: versionId
    }
}

module.exports = {
    getPortfoliosForUser,
    createPortfolio,
    getPortfolioById,
    getPortfolioFullById,
    updatePortfolio,
    deletePortfolio,
    getPublicPortfolioBySlug,
    getPublicPortfolioFullBySlug,
    listTranslations,
    createTranslation,
    updateTranslation,
    deleteTranslation,
    listVersions,
    createVersion,
    getVersionById,
    deleteVersion,
    activateVersion
}

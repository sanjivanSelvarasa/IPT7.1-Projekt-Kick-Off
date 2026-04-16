const ApiError = require('../5_utils/ApiError')
const {
    ensurePayloadObject,
    parseId,
    parseRequiredText,
    parseRequiredUrl
} = require('../5_utils/validators')
const { getOwnedPortfolio } = require('./helpers/portfolioAccess')
const socialLinkModel = require('../4_models/socialLinkModel')

async function listSocialLinks(email, rawPortfolioId) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    return socialLinkModel.getSocialLinksByPortfolioId(portfolio.id)
}

async function createSocialLink(email, rawPortfolioId, data) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    ensurePayloadObject(data)

    const platform = parseRequiredText(data.platform, 'Plattform', 50)
    const url = parseRequiredUrl(data.url, 'URL')

    return socialLinkModel.createSocialLinkForPortfolio(portfolio.id, { platform, url })
}

async function updateSocialLink(email, rawPortfolioId, rawLinkId, data) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    const linkId = parseId(rawLinkId, 'Link-ID')
    ensurePayloadObject(data)

    const existing = await socialLinkModel.getSocialLinkById(linkId)
    if (!existing || existing.portfolioId !== portfolio.id) {
        throw new ApiError(404, 'Social-Link nicht gefunden.')
    }

    const platform = data.platform !== undefined
        ? parseRequiredText(data.platform, 'Plattform', 50)
        : existing.platform
    const url = data.url !== undefined
        ? parseRequiredUrl(data.url, 'URL')
        : existing.url

    return socialLinkModel.updateSocialLink(linkId, { platform, url })
}

async function deleteSocialLink(email, rawPortfolioId, rawLinkId) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    const linkId = parseId(rawLinkId, 'Link-ID')

    const existing = await socialLinkModel.getSocialLinkById(linkId)
    if (!existing || existing.portfolioId !== portfolio.id) {
        throw new ApiError(404, 'Social-Link nicht gefunden.')
    }

    await socialLinkModel.deleteSocialLinkById(linkId)
}

module.exports = {
    listSocialLinks,
    createSocialLink,
    updateSocialLink,
    deleteSocialLink
}

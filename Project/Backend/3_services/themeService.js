const ApiError = require('../5_utils/ApiError')
const {
    ensurePayloadObject,
    parseId,
    parseRequiredText
} = require('../5_utils/validators')
const { getOwnedPortfolio } = require('./helpers/portfolioAccess')
const themeModel = require('../4_models/themeModel')

function parseRequiredColor(value, fieldLabel) {
    const parsed = parseRequiredText(value, fieldLabel, 20)
    if (!/^#[0-9a-fA-F]{6}$/.test(parsed)) {
        throw new ApiError(400, `${fieldLabel} muss ein Hex-Farbwert im Format #RRGGBB sein.`)
    }

    return parsed.toLowerCase()
}

async function listThemes(email, rawPortfolioId) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    return themeModel.getThemesByPortfolioId(portfolio.id)
}

async function createTheme(email, rawPortfolioId, data) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    ensurePayloadObject(data)

    const primaryColor = parseRequiredColor(data.primaryColor, 'Primary Color')
    const secondaryColor = parseRequiredColor(data.secondaryColor, 'Secondary Color')
    const backgroundColor = parseRequiredColor(data.backgroundColor, 'Background Color')
    const surfaceColor = parseRequiredColor(data.surfaceColor, 'Surface Color')
    const textColor = parseRequiredColor(data.textColor, 'Text Color')
    const accentColor = parseRequiredColor(data.accentColor, 'Accent Color')
    const fontFamily = parseRequiredText(data.fontFamily, 'Font Family', 100)

    return themeModel.createThemeForPortfolio(portfolio.id, {
        primaryColor,
        secondaryColor,
        backgroundColor,
        surfaceColor,
        textColor,
        accentColor,
        fontFamily
    })
}

async function updateTheme(email, rawPortfolioId, rawThemeId, data) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    const themeId = parseId(rawThemeId, 'Theme-ID')
    ensurePayloadObject(data)

    const existing = await themeModel.getThemeById(themeId)
    if (!existing || existing.portfolioId !== portfolio.id) {
        throw new ApiError(404, 'Theme nicht gefunden.')
    }

    const primaryColor = data.primaryColor !== undefined
        ? parseRequiredColor(data.primaryColor, 'Primary Color')
        : existing.primaryColor
    const secondaryColor = data.secondaryColor !== undefined
        ? parseRequiredColor(data.secondaryColor, 'Secondary Color')
        : existing.secondaryColor
    const backgroundColor = data.backgroundColor !== undefined
        ? parseRequiredColor(data.backgroundColor, 'Background Color')
        : existing.backgroundColor
    const surfaceColor = data.surfaceColor !== undefined
        ? parseRequiredColor(data.surfaceColor, 'Surface Color')
        : existing.surfaceColor
    const textColor = data.textColor !== undefined
        ? parseRequiredColor(data.textColor, 'Text Color')
        : existing.textColor
    const accentColor = data.accentColor !== undefined
        ? parseRequiredColor(data.accentColor, 'Accent Color')
        : existing.accentColor
    const fontFamily = data.fontFamily !== undefined
        ? parseRequiredText(data.fontFamily, 'Font Family', 100)
        : existing.fontFamily

    return themeModel.updateTheme(themeId, {
        primaryColor,
        secondaryColor,
        backgroundColor,
        surfaceColor,
        textColor,
        accentColor,
        fontFamily
    })
}

async function deleteTheme(email, rawPortfolioId, rawThemeId) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    const themeId = parseId(rawThemeId, 'Theme-ID')

    const existing = await themeModel.getThemeById(themeId)
    if (!existing || existing.portfolioId !== portfolio.id) {
        throw new ApiError(404, 'Theme nicht gefunden.')
    }

    await themeModel.clearCurrentThemeIfMatching(portfolio.id, themeId)
    await themeModel.deleteThemeById(themeId)
}

async function activateTheme(email, rawPortfolioId, rawThemeId) {
    const portfolio = await getOwnedPortfolio(email, rawPortfolioId)
    const themeId = parseId(rawThemeId, 'Theme-ID')

    const existing = await themeModel.getThemeById(themeId)
    if (!existing || existing.portfolioId !== portfolio.id) {
        throw new ApiError(404, 'Theme nicht gefunden.')
    }

    await themeModel.setCurrentThemeForPortfolio(portfolio.id, themeId)

    return {
        portfolioId: portfolio.id,
        currentThemeId: themeId
    }
}

module.exports = {
    listThemes,
    createTheme,
    updateTheme,
    deleteTheme,
    activateTheme
}

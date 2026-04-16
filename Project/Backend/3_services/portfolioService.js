const portfolioModel = require('../4_models/portfolioModel')
const ApiError = require('../5_utils/ApiError')

// Erlaubte Sichtbarkeits-Werte laut Datenbankschema
const ALLOWED_VISIBILITY = ['public', 'private']

// Eingeloggten Benutzer laden oder 404 werfen
async function findUserOrThrow(email) {
    const user = await portfolioModel.findUserByEmail(email)
    if (!user) {
        throw new ApiError(404, 'Benutzer nicht gefunden.')
    }

    return user
}

// Portfolio-ID aus Request-Params parsen und validieren
function parsePortfolioId(id) {
    const parsed = parseInt(id, 10)
    if (Number.isNaN(parsed) || parsed <= 0) {
        throw new ApiError(400, 'Portfolio-ID ist ungültig.')
    }

    return parsed
}

// URL-sicheren Slug aus einem Basis-String erzeugen
function generateSlug(base) {
    return `${base}-${Date.now()}`
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
}

// Slug-Format prüfen: nur Kleinbuchstaben, Zahlen und Bindestriche
function validateSlug(slug) {
    if (!/^[a-z0-9-]+$/.test(slug)) {
        throw new ApiError(400, 'Slug darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten.')
    }

    if (slug.length > 100) {
        throw new ApiError(400, 'Slug darf maximal 100 Zeichen lang sein.')
    }
}

// Sichtbarkeit prüfen
function validateVisibility(visibility) {
    if (!ALLOWED_VISIBILITY.includes(visibility)) {
        throw new ApiError(400, `Sichtbarkeit muss "public" oder "private" sein.`)
    }
}

// Prüfen, ob der angemeldete Benutzer das Portfolio besitzt
function assertOwnership(portfolio, userId) {
    if (portfolio.userId !== userId) {
        throw new ApiError(403, 'Kein Zugriff auf dieses Portfolio.')
    }
}

// Alle Portfolios des angemeldeten Benutzers abrufen
async function getPortfoliosForUser(email) {
    const user = await findUserOrThrow(email)

    return portfolioModel.getPortfoliosByUserId(user.id)
}

// Neues Portfolio mit Benutzerdaten erstellen
async function createPortfolio(email, data) {
    const user = await findUserOrThrow(email)

    // Titel ist Pflichtfeld
    if (typeof data.title !== 'string' || data.title.trim() === '') {
        throw new ApiError(400, 'Titel ist erforderlich.')
    }

    const title = data.title.trim()
    const description = typeof data.description === 'string' ? data.description.trim() : ''
    const visibility = data.visibility ?? 'private'
    validateVisibility(visibility)

    // Slug aus Anfrage übernehmen oder automatisch generieren
    let slug
    if (data.slug) {
        slug = data.slug.trim().toLowerCase()
        validateSlug(slug)
    } else {
        slug = generateSlug(email.split('@')[0])
    }

    try {
        return await portfolioModel.createPortfolioForUser(user.id, { title, description, slug, visibility })
    } catch (err) {
        // Eindeutigkeitsverletzung (Slug bereits vergeben)
        if (err.number === 2627 || err.number === 2601) {
            throw new ApiError(409, 'Dieser Slug ist bereits vergeben. Bitte wähle einen anderen.')
        }
        throw err
    }
}

// Einzelnes Portfolio anhand der ID lesen (Eigentümerprüfung)
async function getPortfolioById(email, rawId) {
    const portfolioId = parsePortfolioId(rawId)
    const user = await findUserOrThrow(email)

    const portfolio = await portfolioModel.getPortfolioById(portfolioId)
    if (!portfolio) {
        throw new ApiError(404, 'Portfolio nicht gefunden.')
    }

    assertOwnership(portfolio, user.id)

    return portfolio
}

// Portfolio aktualisieren – nur übergebene Felder werden geändert (Partial Update)
async function updatePortfolio(email, rawId, data) {
    const portfolioId = parsePortfolioId(rawId)
    const user = await findUserOrThrow(email)

    const existing = await portfolioModel.getPortfolioById(portfolioId)
    if (!existing) {
        throw new ApiError(404, 'Portfolio nicht gefunden.')
    }

    assertOwnership(existing, user.id)

    // Felder übernehmen oder bestehende Werte beibehalten
    const title = data.title !== undefined ? String(data.title).trim() : existing.title
    const description = data.description !== undefined ? String(data.description).trim() : existing.description
    const visibility = data.visibility !== undefined ? data.visibility : existing.visibility
    validateVisibility(visibility)

    let slug = existing.slug
    if (data.slug !== undefined) {
        slug = String(data.slug).trim().toLowerCase()
        validateSlug(slug)
    }

    try {
        return await portfolioModel.updatePortfolio(portfolioId, { title, description, slug, visibility })
    } catch (err) {
        if (err.number === 2627 || err.number === 2601) {
            throw new ApiError(409, 'Dieser Slug ist bereits vergeben. Bitte wähle einen anderen.')
        }
        throw err
    }
}

// Portfolio löschen (Eigentümerprüfung)
async function deletePortfolio(email, rawId) {
    const portfolioId = parsePortfolioId(rawId)
    const user = await findUserOrThrow(email)

    const portfolio = await portfolioModel.getPortfolioById(portfolioId)
    if (!portfolio) {
        throw new ApiError(404, 'Portfolio nicht gefunden.')
    }

    assertOwnership(portfolio, user.id)

    await portfolioModel.deletePortfolioById(portfolioId)
}

module.exports = {
    getPortfoliosForUser,
    createPortfolio,
    getPortfolioById,
    updatePortfolio,
    deletePortfolio
}

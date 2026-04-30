const ApiError = require('./ApiError')

function parseId(rawId, label = 'ID') {
    const parsed = parseInt(rawId, 10)
    if (Number.isNaN(parsed) || parsed <= 0) {
        throw new ApiError(400, `${label} ist ungültig.`)
    }

    return parsed
}

function parseOptionalId(value, label = 'ID') {
    if (value === undefined || value === null) {
        return null
    }

    const parsed = parseInt(value, 10)
    if (Number.isNaN(parsed) || parsed <= 0) {
        throw new ApiError(400, `${label} ist ungültig.`)
    }

    return parsed
}

function ensurePayloadObject(data) {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        throw new ApiError(400, 'Request-Body muss ein JSON-Objekt sein.')
    }
}

function parseRequiredText(value, fieldLabel, maxLength) {
    if (typeof value !== 'string' || value.trim() === '') {
        throw new ApiError(400, `${fieldLabel} ist erforderlich.`)
    }

    const parsed = value.trim()
    if (parsed.length > maxLength) {
        throw new ApiError(400, `${fieldLabel} darf maximal ${maxLength} Zeichen lang sein.`)
    }

    return parsed
}

function parseOptionalText(value, fieldLabel, maxLength) {
    if (value === undefined || value === null) {
        return null
    }

    if (typeof value !== 'string') {
        throw new ApiError(400, `${fieldLabel} muss ein String sein.`)
    }

    const parsed = value.trim()
    if (parsed.length > maxLength) {
        throw new ApiError(400, `${fieldLabel} darf maximal ${maxLength} Zeichen lang sein.`)
    }

    return parsed
}

function parseOptionalDate(value, fieldLabel) {
    if (value === undefined || value === null || value === '') {
        return null
    }

    if (typeof value !== 'string') {
        throw new ApiError(400, `${fieldLabel} muss ein Datum im Format YYYY-MM-DD sein.`)
    }

    const parsed = new Date(`${value}T00:00:00Z`)
    if (Number.isNaN(parsed.getTime())) {
        throw new ApiError(400, `${fieldLabel} ist ungültig. Erwartet wird YYYY-MM-DD.`)
    }

    return value
}

function validateDateRange(startDate, endDate) {
    if (startDate && endDate && startDate > endDate) {
        throw new ApiError(400, 'Startdatum darf nicht nach dem Enddatum liegen.')
    }
}

function parseRequiredUrl(value, fieldLabel) {
    const parsed = parseRequiredText(value, fieldLabel, 255)

    try {
        new URL(parsed)
    } catch {
        throw new ApiError(400, `${fieldLabel} ist keine gültige URL.`)
    }

    return parsed
}

function parseOptionalUrl(value, fieldLabel) {
    const parsed = parseOptionalText(value, fieldLabel, 255)
    if (parsed === null || parsed === '') {
        return null
    }

    try {
        new URL(parsed)
    } catch {
        throw new ApiError(400, `${fieldLabel} ist keine gültige URL.`)
    }

    return parsed
}

function parseSkillLevel(value) {
    const parsed = Number(value)
    if (!Number.isInteger(parsed) || parsed < 1 || parsed > 100) {
        throw new ApiError(400, 'Skill-Level muss eine ganze Zahl zwischen 1 und 100 sein.')
    }

    return parsed
}

function parseOptionalSortOrder(value, fieldLabel = 'Sortierung') {
    if (value === undefined || value === null || value === '') {
        return null
    }

    const parsed = Number(value)
    if (!Number.isInteger(parsed) || parsed < 0) {
        throw new ApiError(400, `${fieldLabel} muss eine ganze Zahl >= 0 sein.`)
    }

    return parsed
}

function parseLanguageCode(value, fieldLabel = 'Sprachcode') {
    if (typeof value !== 'string' || value.trim() === '') {
        throw new ApiError(400, `${fieldLabel} ist erforderlich.`)
    }

    const parsed = value.trim().toLowerCase()
    if (parsed.length > 10) {
        throw new ApiError(400, `${fieldLabel} darf maximal 10 Zeichen lang sein.`)
    }

    if (!/^[a-z]{2,3}(?:-[a-z0-9]{2,6})?$/.test(parsed)) {
        throw new ApiError(400, `${fieldLabel} ist ungültig. Erwartet wird z. B. de oder en.`)
    }

    return parsed
}

function parseSlug(value) {
    if (typeof value !== 'string' || value.trim() === '') {
        throw new ApiError(400, 'Slug ist erforderlich.')
    }

    const parsed = value.trim().toLowerCase()
    if (!/^[a-z0-9-]+$/.test(parsed)) {
        throw new ApiError(400, 'Slug darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten.')
    }

    if (parsed.length > 100) {
        throw new ApiError(400, 'Slug darf maximal 100 Zeichen lang sein.')
    }

    return parsed
}

function validateVisibility(visibility, allowed = ['public', 'private']) {
    if (!allowed.includes(visibility)) {
        throw new ApiError(400, 'Sichtbarkeit muss "public" oder "private" sein.')
    }
}

module.exports = {
    parseId,
    parseOptionalId,
    ensurePayloadObject,
    parseRequiredText,
    parseOptionalText,
    parseOptionalDate,
    validateDateRange,
    parseRequiredUrl,
    parseOptionalUrl,
    parseSkillLevel,
    parseOptionalSortOrder,
    parseLanguageCode,
    parseSlug,
    validateVisibility
}

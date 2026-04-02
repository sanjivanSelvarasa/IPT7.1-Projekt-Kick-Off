const ApiError = require('./ApiError')

const PASSWORD_MIN_LENGTH = 6
const PASSWORD_MAX_LENGTH = 50

function parseEmail(value) {
    if (typeof value !== 'string') {
        throw new ApiError(400, 'Email is required and must be a string.')
    }

    const email = value.trim().toLowerCase()
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
        throw new ApiError(400, 'Email is malformed. Please provide a valid email address.')
    }

    return email
}

function parsePassword(value) {
    if (typeof value !== 'string') {
        throw new ApiError(400, 'Password is required and must be a string.')
    }

    if (value.length < PASSWORD_MIN_LENGTH || value.length > PASSWORD_MAX_LENGTH) {
        throw new ApiError(
            400,
            `Password length must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters.`
        )
    }

    return value
}

function parseTokenFromBody(body) {
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
        throw new ApiError(400, 'Token payload is missing or malformed. Expected JSON object with a token field.')
    }

    if (typeof body.token !== 'string' || body.token.trim().length === 0) {
        throw new ApiError(400, 'Token payload is missing or malformed. "token" must be a non-empty string.')
    }

    return body.token.trim()
}

module.exports = {
    parseEmail,
    parsePassword,
    parseTokenFromBody
}

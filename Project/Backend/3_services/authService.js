const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const ApiError = require('../5_utils/ApiError')
const authModel = require('../4_models/authModel')

function hashToken(token) {
    return crypto.createHash('sha256').update(token).digest('hex')
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' })
}

function normalizeUsernameBase(email) {
    const localPart = email.split('@')[0] || 'user'
    return localPart.toLowerCase().replace(/\s+/g, '')
}

function buildUsernameCandidate(base, suffix = '') {
    const suffixText = suffix === '' ? '' : String(suffix)
    const maxBaseLength = Math.max(1, 50 - suffixText.length)
    return `${base.slice(0, maxBaseLength)}${suffixText}`
}

async function generateAvailableUsername(email) {
    const base = normalizeUsernameBase(email)

    for (let attempt = 0; attempt <= 99; attempt += 1) {
        const suffix = attempt === 0 ? '' : attempt
        const candidate = buildUsernameCandidate(base, suffix)

        if (!await authModel.hasUserWithUsername(candidate)) {
            return candidate
        }
    }

    throw new ApiError(409, 'Could not generate a unique username. Please try again.')
}

async function refreshAccessToken(refreshToken) {
    if (!await authModel.hasRefreshToken(hashToken(refreshToken))) {
        throw new ApiError(403, 'Refresh token is invalid or has been revoked.')
    }

    let user
    try {
        user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    } catch {
        throw new ApiError(403, 'Refresh token is expired or invalid.')
    }

    if (!user || typeof user.email !== 'string') {
        throw new ApiError(403, 'Refresh token payload is malformed.')
    }

    return generateAccessToken({ email: user.email })
}

async function listUserEmails() {
    const users = await authModel.getUsers()
    return users.map(user => user.email)
}

async function registerUser(submittedEmail, submittedPassword) {
    if (await authModel.hasUserWithEmail(submittedEmail)) {
        throw new ApiError(409, 'Email already registered.')
    }

    const hashedPassword = await bcrypt.hash(submittedPassword, 10)
    const username = await generateAvailableUsername(submittedEmail)

    try {
        await authModel.addUser({
            username,
            email: submittedEmail,
            passwordHash: hashedPassword
        })
    } catch (error) {
        if (error.number === 2627 || error.number === 2601) {
            throw new ApiError(409, 'Email or username already registered.')
        }

        throw error
    }
}

async function loginUser(submittedEmail, submittedPassword) {
    const user = await authModel.findUserByEmail(submittedEmail)
    if (!user) {
        throw new ApiError(401, 'Invalid email.')
    }

    const isPasswordValid = await bcrypt.compare(submittedPassword, user.passwordHash)
    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid password.')
    }

    const accessToken = generateAccessToken({ email: user.email })
    const refreshToken = jwt.sign(
        { email: user.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d' }
    )

    const decodedRefreshToken = jwt.decode(refreshToken)
    if (!decodedRefreshToken || typeof decodedRefreshToken !== 'object' || typeof decodedRefreshToken.exp !== 'number') {
        throw new ApiError(500, 'Failed to generate a refresh token expiration.')
    }

    const refreshTokenExpiresAt = new Date(decodedRefreshToken.exp * 1000)

    await authModel.addRefreshToken(hashToken(refreshToken), user.id)

    return { accessToken, refreshToken, refreshTokenExpiresAt }
}

async function logoutUser(refreshToken) {
    await authModel.removeRefreshToken(hashToken(refreshToken))
}

module.exports = {
    refreshAccessToken,
    listUserEmails,
    registerUser,
    loginUser,
    logoutUser
}

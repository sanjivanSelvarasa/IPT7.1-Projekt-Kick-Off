const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const ApiError = require('../utils/ApiError')
const authModel = require('../models/authModel')

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' })
}

async function refreshAccessToken(refreshToken) {
    if (!authModel.hasRefreshToken(refreshToken)) {
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

function listUserEmails() {
    return authModel.getUsers().map(user => user.email)
}

async function registerUser(submittedEmail, submittedPassword) {
    if (authModel.hasUserWithEmail(submittedEmail)) {
        throw new ApiError(409, 'Email already registered.')
    }

    const hashedPassword = await bcrypt.hash(submittedPassword, 10)
    authModel.addUser({ email: submittedEmail, password: hashedPassword })
}

async function loginUser(submittedEmail, submittedPassword) {
    const user = authModel.findUserByEmail(submittedEmail)
    if (!user) {
        throw new ApiError(401, 'Invalid email.')
    }

    const isPasswordValid = await bcrypt.compare(submittedPassword, user.password)
    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid password.')
    }

    const accessToken = generateAccessToken({ email: user.email })
    const refreshToken = jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET)
    authModel.addRefreshToken(refreshToken)

    return { accessToken, refreshToken }
}

function logoutUser(refreshToken) {
    authModel.removeRefreshToken(refreshToken)
}

module.exports = {
    refreshAccessToken,
    listUserEmails,
    registerUser,
    loginUser,
    logoutUser
}

const authService = require('../3_services/authService')
const { parseEmail, parsePassword, parseTokenFromRequest } = require('../5_utils/authParsers')

const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken'
const REFRESH_TOKEN_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
}

async function refreshToken(req, res) {
    const refreshToken = parseTokenFromRequest(req)
    const accessToken = await authService.refreshAccessToken(refreshToken)
    res.json({ accessToken })
}

async function getUsers(req, res) {
    res.json(await authService.listUserEmails())
}

async function registerUser(req, res) {
    const submittedEmail = parseEmail(req.body?.email)
    const submittedPassword = parsePassword(req.body?.password)

    await authService.registerUser(submittedEmail, submittedPassword)
    res.status(201).json({ message: 'User registered successfully.' })
}

async function logoutUser(req, res) {
    const refreshToken = parseTokenFromRequest(req)
    await authService.logoutUser(refreshToken)
    res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_OPTIONS)
    res.sendStatus(204)
}

async function loginUser(req, res) {
    const submittedEmail = parseEmail(req.body?.email)
    const submittedPassword = parsePassword(req.body?.password)

    const { accessToken, refreshToken, refreshTokenExpiresAt } = await authService.loginUser(submittedEmail, submittedPassword)

    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
        ...REFRESH_TOKEN_COOKIE_OPTIONS,
        expires: refreshTokenExpiresAt
    })

    res.json({ accessToken })
}

module.exports = {
    refreshToken,
    getUsers,
    registerUser,
    logoutUser,
    loginUser
}

const authService = require('../services/authService')
const { parseEmail, parsePassword, parseTokenFromBody } = require('../utils/authParsers')

async function refreshToken(req, res) {
    const refreshToken = parseTokenFromBody(req.body)
    const accessToken = await authService.refreshAccessToken(refreshToken)
    res.json({ accessToken })
}

function getUsers(req, res) {
    res.json(authService.listUserEmails())
}

async function registerUser(req, res) {
    const submittedEmail = parseEmail(req.body?.email)
    const submittedPassword = parsePassword(req.body?.password)

    await authService.registerUser(submittedEmail, submittedPassword)
    res.status(201).json({ message: 'User registered successfully.' })
}

function logoutUser(req, res) {
    const refreshToken = parseTokenFromBody(req.body)
    authService.logoutUser(refreshToken)
    res.sendStatus(204)
}

async function loginUser(req, res) {
    const submittedEmail = parseEmail(req.body?.email)
    const submittedPassword = parsePassword(req.body?.password)

    const tokens = await authService.loginUser(submittedEmail, submittedPassword)
    res.json(tokens)
}

module.exports = {
    refreshToken,
    getUsers,
    registerUser,
    logoutUser,
    loginUser
}

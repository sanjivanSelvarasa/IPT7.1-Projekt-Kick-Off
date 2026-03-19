require('dotenv').config()

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(express.json())

const PASSWORD_MIN_LENGTH = 6
const PASSWORD_MAX_LENGTH = 50

let refreshTokens = [] // sql here

const users = [] // sql here

class ApiError extends Error {
    constructor(status, message, details) {
        super(message)
        this.status = status
        this.details = details
    }
}

function asyncHandler(handler) {
    return (req, res, next) => {
        Promise.resolve(handler(req, res, next)).catch(next)
    }
}

// PARSERS AND VALIDATORS
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

app.post('/token', asyncHandler(async (req, res) => {
    const refreshToken = parseTokenFromBody(req.body)

    if (!refreshTokens.includes(refreshToken)) {
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

    const accessToken = generateAccessToken({ email: user.email })
    res.json({ accessToken: accessToken })
}))


// GET and POST Requests for Registration and Login

// send all existing user-emails
app.get('/users',(req,res) => {
       res.json(users.map(user => user.email))
})

// Register User
app.post('/users/register', asyncHandler(async (req, res) => {
    const submittedEmail = parseEmail(req.body?.email)
    const submittedPassword = parsePassword(req.body?.password)

    const userAlreadyExists = users.some(
        user => user.email.toLowerCase() === submittedEmail
    )

    if (userAlreadyExists) {
        throw new ApiError(409, 'Email already registered.')
    }

    const hashedPassword = await bcrypt.hash(submittedPassword, 10)
    const user = { email: submittedEmail, password: hashedPassword }
    users.push(user)
    res.status(201).json({ message: 'User registered successfully.' })
}))

app.delete('/users/logout', asyncHandler(async (req, res) => {
    const refreshToken = parseTokenFromBody(req.body)
    refreshTokens = refreshTokens.filter(token => token !== refreshToken)
    res.sendStatus(204)
}))

// Login User
app.post('/users/login', asyncHandler(async (req, res) => {
    const submittedEmail = parseEmail(req.body?.email)
    const submittedPassword = parsePassword(req.body?.password)

    const user = users.find(existingUser => existingUser.email === submittedEmail)
    if (!user) {
        throw new ApiError(401, 'Invalid email.')
    }

    const isPasswordValid = await bcrypt.compare(submittedPassword, user.password)
    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid password.')
    }

    const accessToken = generateAccessToken({ email: user.email })
    const refreshToken = jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
}))

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' })
}

app.use((req, res, next) => {
    next(new ApiError(404, 'Route not found.'))
})

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'Malformed JSON body.' })
    }

    const status = Number.isInteger(err.status) ? err.status : 500
    const message = status === 500 ? 'Internal server error.' : err.message

    if (status === 500) {
        console.error('Unhandled error:', err)
    }

    const response = { error: message }
    if (err.details) {
        response.details = err.details
    }

    return res.status(status).json(response)
})

const server = app.listen(4000)


//For graceful shutdown (e.g., when running in Docker)
process.on('SIGTERM', () => {
    server.closeAllConnections()
    server.close(() => process.exit(0))
})
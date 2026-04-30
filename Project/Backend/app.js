require('dotenv').config()

const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const authRoutes = require('./0_routes/authRoutes')
const portfolioRoutes = require('./0_routes/portfolioRoutes')
const notFoundHandler = require('./1_middleware/notFoundHandler')
const errorHandler = require('./1_middleware/errorHandler')
const database = require('./4_models/database')

const app = express()

const configuredOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim()).filter(Boolean)
    : ['http://localhost:5173']

const allowAnyOrigin = configuredOrigins.includes('*') // I've only added this for development purposes, but it should be removed in production to avoid security risks.

app.use(cors({
    origin(origin, callback) {
        if (!origin) {
            return callback(null, true)
        }

        if (allowAnyOrigin || configuredOrigins.includes(origin)) {
            return callback(null, true)
        }

        return callback(new Error(`CORS blocked for origin: ${origin}`))
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/', authRoutes)
app.use('/', portfolioRoutes)
app.use(notFoundHandler)
app.use(errorHandler)

const port = Number(process.env.PORT) || 3000

async function startServer() {
    await database.connectWithRetry()

    const server = app.listen(port)

    process.on('SIGTERM', async () => {
        server.closeAllConnections()
        server.close(async () => {
            await database.closePool()
            process.exit(0)
        })
    })
}

startServer().catch(error => {
    console.error('Failed to start backend:', error)
    process.exit(1)
})

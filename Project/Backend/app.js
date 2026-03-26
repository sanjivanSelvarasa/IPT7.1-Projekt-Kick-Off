require('dotenv').config()

const express = require('express')

const authRoutes = require('./routes/authRoutes')
const portfolioRoutes = require('./routes/portfolioRoutes')
const notFoundHandler = require('./middleware/notFoundHandler')
const errorHandler = require('./middleware/errorHandler')

const app = express()
app.use(express.json())

app.use('/', authRoutes)
app.use('/', portfolioRoutes)
app.use(notFoundHandler)
app.use(errorHandler)

const server = app.listen(3000)

// For graceful shutdowns (e.g., when running in Docker)
process.on('SIGTERM', () => {
    server.closeAllConnections()
    server.close(() => process.exit(0))
})

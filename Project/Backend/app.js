require('dotenv').config()

const express = require('express')
const path = require('path')

const authRoutes = require('./0_routes/authRoutes')
const portfolioRoutes = require('./0_routes/portfolioRoutes')
const notFoundHandler = require('./1_middleware/notFoundHandler')
const errorHandler = require('./1_middleware/errorHandler')
const database = require('./4_models/database')

const app = express()
app.use(express.json())
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

require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const data = [
    {
        email: 'gian@example.com',
        content: 'Post 1'
    },
    {
        email: 'egor@example.com',
        content: 'Post 2' 
}] // sql here
//curl -X GET http://localhost:3000/posts/

app.get('/posts',authenticateToken, (req, res) => {
    res.json(data.filter(post => post.email === req.user.email))
})

// Authentication Middleware
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

const server = app.listen(3000)

//For graceful shutdowns (e.g., when running in Docker)
process.on('SIGTERM', () => {
    server.closeAllConnections()
    server.close(() => process.exit(0))
})
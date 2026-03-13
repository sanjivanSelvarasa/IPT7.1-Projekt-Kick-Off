require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const posts = [
    {
        email: 'gian@example.com',
        title: 'Post 1'
    },
    {
        email: 'egor@example.com',
        title: 'Post 2' 
}] // sql here
//curl -X GET http://localhost:3000/posts/

app.get('/posts',authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.email === req.user.email))
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

app.listen(3000)
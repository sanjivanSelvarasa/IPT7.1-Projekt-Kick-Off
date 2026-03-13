require('dotenv').config()

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(express.json())

let refreshTokens = [] // sql here

app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ email: user.email })
        res.json({ accessToken: accessToken })
    })
})

const users = [] // sql here

// Basic GET POST Requests for Registration and Login

// send all existing emails
app.get('/users',(req,res) => {
       res.json(users.map(user => user.email))
})

// Register User
app.post('/users/register', async (req, res) => {
        const submittedEmail = req.body.email?.trim()
        const userAlreadyExists = users.some(
            user => user.email.toLowerCase() === submittedEmail?.toLowerCase()
        )

        if (userAlreadyExists) {
            return res.status(409).send('Email already exists')
        }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(hashedPassword)
            const user = { email: submittedEmail, password: hashedPassword }
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
})

app.delete('/users/logout', (req, res) => {
    const refreshToken = req.body.token
    refreshTokens = refreshTokens.filter(token => token !== refreshToken)
    res.sendStatus(204)
})

// Login User
app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.email === req.body.email)
    if (user == null){
        return res.status(400).send('Cannot find user with that email')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)){
            if (!process.env.ACCESS_TOKEN_SECRET) {
                return res.status(500).send('Server misconfiguration: ACCESS_TOKEN_SECRET is missing')
            }
            const accessToken = generateAccessToken({ email: user.email })
            const refreshtoken = jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET)
            refreshTokens.push(refreshtoken)
            res.json({ accessToken: accessToken, refreshToken: refreshtoken })
        } else {
            res.send('Invalid Password')
        }
    } catch (err) {
        console.error('Login failed:', err)
        res.status(500).send(":(")
    }
})

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' })
}

app.listen(4000)
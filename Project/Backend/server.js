const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

app.use(express.json())

const users = []

// Basic GET POST Requests for Registration and Login

app.get('/users',(req,res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(hashedPassword)
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if (user == null){
        return res.status(400).send('Cannot find user with that username')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)){
            res.send('Success')
        } else {
            res.send('Invalid Password')
        }
    } catch {
        res.status(500).send()
    }
})

app.listen(3000)
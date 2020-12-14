const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
require('express-async-errors')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1 })
    response.json(users.map(user => user.toJSON()))
})
  
usersRouter.post('/', async (request, response) => {
    const body = request.body
    if (body.password.length < 3) 
        return response.status(400).json({ error: 'Too short password!' })
    const saltRounds = 10
    const pwdHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        pwdHash
    })

    response.status(201).json(await user.save())
})

module.exports = usersRouter
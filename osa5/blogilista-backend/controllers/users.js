const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

const validateUser = (user) =>
    'username' in user &&
    user.username.length >= 3 &&
    'password' in user &&
    user.password.length >= 3 &&
    'name' in user

userRouter.get('/', (request, response) => {
    User
        .find({})
        .populate('blogs')
        .then(users => {
            response.json(users)
        })
})

userRouter.get('/:userId', (request, response) => {
    User
        .findById(request.params.userId)
        .populate('blogs')
        .then(users => {
            response.json(users)
        })
})

userRouter.post('/', async (request, response, next) => {
    try {
        if (!validateUser(request.body)) {
            response
                .status(400)
                .json({error: 'User data not valid'})
            return
        }
        const userData = {
            username: request.body.username,
            password: await bcrypt.hash(request.body.password, 10),
            name: request.body.name
        }

        const savedUser = await (new User(userData)).save()

        if (savedUser) {
            response.status(201).json(savedUser)
        } else {
            response.status(500).end()
        }
    } catch(e){
        next(e)
    }

})

module.exports = userRouter
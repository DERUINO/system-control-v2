const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const {secret} = require('../config')

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }

    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty())
                return res.status(400).json({ message: 'Ошибка при регистрации', errors })
            
            const {username, password, confirmpass, email} = req.body
            const candidate = await User.findOne({ username })
            
            if (candidate)
                return res.status(400).json({message: 'Пользователь с таким именем уже существует'})

            if (password !== confirmpass)
                return res.status(400).json({message: 'Пароли не совпадают'})

            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: 'USER'})
            const user = new User({ username, password: hashPassword, email, roles: [userRole.value] })
            await user.save()
            return res.json({message: 'пользователь успешно зарегистрирован'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({ username })
            
            if (!user)
                return res.status(400).json({ message: `Пользователь ${username} не найден` })
            
            const checkPassword = bcrypt.compareSync(password, user.password)

            if (!checkPassword)
                return res.status(400).json({ message: `Неверный пароль` })
            
            const token = generateAccessToken(user._id, user.roles)
            return res.json({ token, status: 200 })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }
}

module.exports = new authController()
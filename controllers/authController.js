const Account = require('../models/Account');
const Role = require('../models/Role');
const Logs = require('../models/Logs');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const {secret} = require('../config');

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
            const candidate = await Account.findOne({ username }).lean()
            
            if (candidate)
                return res.status(400).json({ errors: { errors: [{ msg: 'Пользователь с таким именем уже существует' }] } })

            if (password !== confirmpass)
                return res.status(400).json({ errors: { errors: [{ msg: 'Пароли не совпадают' }] } })

            const hashPassword = bcrypt.hashSync(password, 7);

            const userRole = await Role.findOne({value: 'USER'}).lean()

            const user = new Account({ username, password: hashPassword, email, roles: [userRole.value] })
            await user.save()
            
            return res.json({ message: 'пользователь успешно зарегистрирован', status: 200 })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body
            const user = await Account.findOne({ username })
            
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
            const usersList = await Account.find().lean()
            res.json({ data: usersList, status: 200 })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'response error'})
        }
    }
}

module.exports = new authController()
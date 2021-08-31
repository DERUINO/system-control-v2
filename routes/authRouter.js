const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const { check } = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', [
    check('username', 'имя пользователя не может быть пустым').notEmpty(),
    check('password', 'пароль не может быть меньше 4 и больше 16 символов').isLength({min: 4, max: 16})
], controller.registration)

router.post('/login', controller.login)

router.get('/users', authMiddleware, controller.getUsers)

module.exports = router
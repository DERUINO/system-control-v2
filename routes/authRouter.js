const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const { check } = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', [
    check('username', 'имя пользователя не может быть пустым').notEmpty(),
    check('password', 'пароль не может быть меньше 4 и больше 16 символов')
        .notEmpty()
        .withMessage('Пароль не может быть пустым')
        .isLength({min: 4, max: 16})
        .withMessage('пароль не может быть меньше 4 и больше 16 символов'),
    check('email')
        .notEmpty()
        .withMessage('эл. почта не может быть пустой')
        .custom((val) => /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/g.test(val))
        .withMessage('некорректный формат эл. почты')
], controller.registration)

router.post('/login', controller.login)

router.post('/users', authMiddleware, controller.getUsers)

router.get('/roles', controller.roles)

module.exports = router
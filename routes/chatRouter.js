const Router = require('express')
const router = new Router()
const controller = require('../controllers/chatController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/add_message', controller.addMessage)
router.post('/get_messages', controller.getMessages)

module.exports = router
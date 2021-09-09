const Router = require('express')
const router = new Router()
const controller = require('../controllers/settingsController')

router.post('/addroom', controller.addRoom)
router.post('/deleteroom', controller.deleteRoom)
router.post('/adduser', controller.addUser)
router.post('/deleteuser', controller.deleteUser)
router.post('/addspec', controller.addSpec)
router.post('/deletespec', controller.deleteSpec)
router.post('/getspecs', controller.getSpecs)
router.post('/getusers', controller.getUsers)
router.post('/getrooms', controller.getRooms)

module.exports = router
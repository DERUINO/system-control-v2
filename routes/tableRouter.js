const Router = require('express')
const router = new Router()
const controller = require('../controllers/tableController')

router.post('/gettables', controller.getTables)
router.post('/getusers', controller.getUsers)
router.post('/getfilteredtables', controller.getFilteredTables)
router.post('/getpaginatedtables', controller.getPaginatedTables)
router.post('/getsearchedpaginatedtables', controller.getSearchedPaginatedTables)
router.post('/addtable', controller.addTable)
router.post('/deletetable', controller.deleteTable)
router.post('/getout', controller.getOut)

module.exports = router
const Router = require('express')
const router = new Router()
const adminControllers = require('../controllers/adminController')
const authMiddleware = require('../middleware/authMiddleware')



router.post('/registration', adminControllers.registration)
router.post('/login', adminControllers.login)
router.get('/auth',authMiddleware, adminControllers.check)

module.exports = router 
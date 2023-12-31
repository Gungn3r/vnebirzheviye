const Router = require('express')
const router = new Router()
const userControllers = require('../controllers/userControllers')
const authMiddleware = require('../middleware/authMiddleware')



router.post('/registration', userControllers.registration)
router.post('/login', userControllers.login)
router.get('/auth',authMiddleware, userControllers.check)
router.get('/me', authMiddleware, (req,res)=>{res.json({user: req.user})})

module.exports = router 
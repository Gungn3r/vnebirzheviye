const Router = require('express')
const router = new Router()
const applicationController = require('../controllers/applicationControler')
const checkRole = require('../middleware/checkRoleMiddleware');




router.post('/create', checkRole('USER'), applicationController.create);
//router.post('/:id/admin/approve', checkRole('ADMIN'), applicationController.approveApplication);
router.get('/all', checkRole('USER'), applicationController.getAll);
router.get('/:id', checkRole('USER'), applicationController.getOne);
router.get('/all', checkRole('ADMIN'), applicationController.getAll);
router.get('/:id', checkRole('ADMIN'), applicationController.getOne);
router.post('/:id/admin/check', checkRole('ADMIN'), applicationController.checkApplication);
router.post('/:id/user/confirm', checkRole('USER'), applicationController.confirmApplication);
router.post('/:id/admin/assign-deal-number', checkRole('ADMIN'), applicationController.assignDealNumber);

module.exports = router;
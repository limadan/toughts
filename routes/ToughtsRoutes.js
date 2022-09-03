const express = require('express');
const ToughtsController = require('../controllers/ToughtsController');
const router = express.Router();

const checkAuth = require('../helpers/auth').checkAuth

router.get('/add', checkAuth, ToughtsController.createTought)
router.post('/add', checkAuth, ToughtsController.createToughtSave)
router.get('/edit/:id', checkAuth, ToughtsController.updateTought)
router.post('/edit/:id', checkAuth, ToughtsController.updateToughtSave)

router.get('/dashboard', checkAuth, ToughtsController.dashboard)
router.post('/remove', checkAuth, ToughtsController.removeTought)
router.get('/', ToughtsController.showToughts)

module.exports = router;
const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')
const validate = require('../middleware/validate')
const auth = require('../middleware/auth')
const vehicleController = require('../controllers/vehicles')

router.post('/create', auth, validate(schemas.vehicle), vehicleController.create)
router.put('/:id', auth, vehicleController.update)
router.get('/', auth, vehicleController.index)
router.get('/:id', auth, vehicleController.show)
router.delete('/:id', auth, vehicleController.delete)


module.exports = router
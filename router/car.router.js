const router = require('express').Router();

const {carController} = require('../controller')

router.get('/', carController.getAllCars);
router.post('/', carController.createCar);

module.exports = router;
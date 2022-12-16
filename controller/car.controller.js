const {carService} = require('../service');

module.exports = {
    getAllCars: async (req, res, next) => {
        try {
            const cars = await carService.find({})

            res.json(cars);
        } catch (e) {
            next(e)
        }
    },
    createCar: async (req, res, next) => {
        try {
            let carInfo = req.body;

            const car = await carService.create(carInfo)

            res.status(201).json(car)
        } catch (e) {
            next(e)
        }
    }
}
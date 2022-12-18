const Car = require('../DataBase/Car');

module.exports = {
    find: async (filter = {}) => {
        return Car.find(filter);
    },
    findOneByIdWithUser: async (carId) => {
        return Car.findById(carId).populate('user');
    },
    create: (carInfo) => {
        return Car.create(carInfo)
    }
}
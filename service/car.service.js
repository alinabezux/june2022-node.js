const Car = require('../DataBase/Car');

module.exports = {
    find: (filter) => {
        return Car.find(filter);
    },
    create: (carInfo) => {
        return Car.create(carInfo)
    }
}
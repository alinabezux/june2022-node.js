const User = require('../dataBase/User');

module.exports = {
    find: async (query) => {
        const {limit = 10, page = 1, name} = query;

        let findObject = {};

        if (name) {
            findObject = {...findObject, name: new RegExp(name)};
        }

        const [users, count] = await Promise.all([
                User.find(findObject).limit(limit).skip((+page - 1) * limit),
                User.count(findObject),
            ]
        )
        return {
            users,
            page: +page,
            count,
        }
    }
}
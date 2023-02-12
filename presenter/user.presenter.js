const normalize = (user) => {
    // user = user.toJSON();
    // const properties = [
    //     'password',
    //     '__v',
    //     '_id'
    // ]
    // properties.forEach(property => delete user[property])
    // return user;

    return {
        name: user.name,
        email: user.email,
        age: user.age,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
};

const normalizeMany = (users) => {
    return users.map(user => normalize(user));
};

module.exports = {
    normalize, normalizeMany
}
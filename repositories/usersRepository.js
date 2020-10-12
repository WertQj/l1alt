const User = require('../models/user');
const JsonStorage = require('../jsonStorage');

class UserRepository {

    constructor(filePath) {
        this.storage = new JsonStorage(filePath);
    }

    getUsers() {
        const items = this.storage.readItems().items;
        return items;
    }

    getUserById(id) {
        const items = this.storage.readItems().items;
        let user = null;
        items.forEach(item => {
            if (item.id === id) {
                user = new User(item.id, item.login, item.fullname, item.role, item.registeredAt, item.avaUrl, item.isEnable);
            }
        });
        return user;
    }
};

module.exports = UserRepository;

const Role = require('../models/Role');

module.exports = {
    role: {
        list: async () => await Role.findAll(),
    }
}
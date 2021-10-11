const User = require('../models/User');

module.exports = {
    list: async () => await User.findAll({ include: ["role"] }),
    info: async id => await User.findOne({ where: { id } }),
    add: async info => await User.create(info),
    edit: async (id, info) => await User.update(info, { where: { id } }),
    remove: async id => await User.destroy({ where: { id } }),
}
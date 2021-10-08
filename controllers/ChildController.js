const Child = require('./../models/Child');

module.exports = {
  list: async () => await Child.findAll(),
  info: async id => await Child.findOne({ where: { id } }),
  add: async info => await Child.create(info),
  edit: async (id, info) => await Child.update(info, { where: { id } }),
  remove: async id => await Child.destroy({ where: { id } }),
}
let { Model, DataTypes } = require("sequelize");
const sequelize = require("../helpers/connection");

class Role extends Model {};
/* MODEL CONTROLLER */
Role.init({
    key: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    createdAt: false,
    updatedAt: false,
    sequelize,
    tableName: "role"
})

module.exports = Role;
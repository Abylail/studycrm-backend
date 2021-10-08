let { Model, DataTypes } = require("sequelize");
const sequelize = require("../helpers/connection");

class Child extends Model {};

Child.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    createdAt: false,
    updatedAt: false,
    sequelize,
    tableName: "children"
})

module.exports = Child;
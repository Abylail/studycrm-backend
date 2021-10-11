let { Model, DataTypes } = require("sequelize");
const sequelize = require("../helpers/connection");

const Role = require("./Role");

class User extends Model {};

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
},{
    sequelize,
    createdAt: false,
    updatedAt: false,
    tableName: "users"
})

User.belongsTo(Role, { foreignKey: "role_id", as: "role"})
// Role.hasOne(User, { foreignKey: "role_id", as: "role"})

module.exports = User;
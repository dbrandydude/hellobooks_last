'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* eslint no-unused-vars: ["error", { "args": "none" }] */

var model = function model(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        level: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    // Class Method
    User.associate = function (models) {
        User.hasMany(models.Inventory, { foreignKey: 'userId' });
    };

    return User;
};

exports.default = model;
//# sourceMappingURL=user.js.map
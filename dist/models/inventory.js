'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* eslint no-unused-vars: ["error", { "args": "none" }] */

var model = function model(sequelize, DataTypes) {
    var Inventory = sequelize.define('Inventory', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        return: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    // Class Method
    Inventory.associate = function (models) {
        Inventory.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };

    return Inventory;
};

exports.default = model;
//# sourceMappingURL=inventory.js.map
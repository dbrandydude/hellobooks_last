'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* eslint no-unused-vars: ["error", { "args": "none" }] */

var model = function model(sequelize, DataTypes) {
    var Book = sequelize.define('Book', {
        isbn: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        published: DataTypes.DATE,
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        qty: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function associate(models) {
                // associations can be defined here
            }
        }
    });
    return Book;
};

exports.default = model;
//# sourceMappingURL=book.js.map
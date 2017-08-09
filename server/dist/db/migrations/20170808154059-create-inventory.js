'use strict';

/* eslint no-unused-vars: ["error", { "args": "none" }] */

module.exports = {
    up: function up(queryInterface, Sequelize) {
        return queryInterface.createTable('Inventories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            book: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            return: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function down(queryInterface, Sequelize) {
        return queryInterface.dropTable('Inventories');
    }
};
//# sourceMappingURL=20170808154059-create-inventory.js.map
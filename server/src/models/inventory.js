/* eslint no-unused-vars: ["error", { "args": "none" }] */

const model = (sequelize, DataTypes) => {
    const Inventory = sequelize.define('Inventory', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        book: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        return: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });

    // Class Method
    Inventory.associate = (models) => {
        Inventory.hasOne(models.Book, {
            foreignKey: 'borrowId',
        });
        Inventory.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };

    return Inventory;
};

export default model;

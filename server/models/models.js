const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    firstName: { type: DataTypes.STRING },
    secondName: { type: DataTypes.STRING },
    nickName: { type: DataTypes.STRING },
    phoneNumber: { type: DataTypes.STRING },
    userCurrency: { type: DataTypes.STRING },
});

const Category = sequelize.define("category", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
    },
    name: { type: DataTypes.STRING, allowNull: false },
    icon: { type: DataTypes.STRING, allowNull: false },
    color: { type: DataTypes.STRING, allowNull: false },
});

const Expense = sequelize.define("expense", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATE, allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: "id",
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
    },
    description: { type: DataTypes.STRING },
});

User.hasMany(Category);
Category.belongsTo(User);

Category.hasMany(Expense);
Expense.belongsTo(Category);

module.exports = {
    User,
    Category,
    Expense,
};

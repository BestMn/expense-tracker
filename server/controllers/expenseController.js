const uuid = require("uuid");
const path = require("path");
const { Expense, Category } = require("../models/models");
const ApiError = require("../error/ApiError");

class ExpenseController {
    async create(req, res, next) {
        try {
            let { date, amount, categoryId, description, userId } = req.body;
            const expense = await Expense.create({
                userId,
                date,
                amount,
                categoryId,
                description,
            });
            return res.json(expense);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let { userId, limit, page } = req.query;
        page = page || 1;
        limit = limit || 10;
        let offset = page * limit - limit;
        let expenses = await Expense.findAndCountAll({
            where: { userId },
            limit,
            offset,
            order: [["date", "DESC"]],
        });
        return res.json(expenses);
    }
}

module.exports = new ExpenseController();

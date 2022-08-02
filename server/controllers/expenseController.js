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
        limit = limit || 9;
        let offset = page * limit - limit;
        let expenses = await Expense.findAndCountAll({
            where: { userId },
            limit,
            offset,
        });

        return res.json(expenses);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const expense = await Expense.findOne({
            where: { id },
        });
        return res.json(expense);
    }
}

module.exports = new ExpenseController();

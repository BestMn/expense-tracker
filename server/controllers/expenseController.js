const uuid = require("uuid");
const path = require("path");
const { Op } = require("sequelize");
const { Expense, Category } = require("../models/models");
const ApiError = require("../error/ApiError");
const moment = require("moment");

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

    async edit(req, res) {
        const { id, categoryId, amount, date, description } = req.body;
        const updatedExpense = await Expense.update(
            {
                categoryId,
                amount,
                date,
                description,
            },
            { where: { id }, returning: true }
        );
        return res.json(updatedExpense);
    }

    async getAll(req, res) {
        let { userId } = req.query;
        // let where = { userId: userId };
        // if (date) {
        //     const momentDate = moment(date);
        //     where = {
        //         userId: { [Op.eq]: userId },
        //         date: {
        //             [Op.between]: [
        //                 momentDate.startOf("day").toString(),
        //                 momentDate.endOf("day").toString(),
        //             ],
        //         },
        //     };
        // }
        // page = page || 1;
        // limit = limit || 10;
        // let offset = page * limit - limit;
        let expenses = await Expense.findAll({
            where: { userId },
            order: [["date", "DESC"]],
        });
        return res.json(expenses);
    }
}

module.exports = new ExpenseController();

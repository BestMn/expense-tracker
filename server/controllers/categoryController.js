const { Category, Expense } = require("../models/models");
const ApiError = require("../error/ApiError");
const jwt = require("jsonwebtoken");

const generateJwt = (id, email) => {
    return jwt.sign({ id, email }, process.env.SECRET_KEY, {
        expiresIn: "4h",
    });
};

class CategoryController {
    async create(req, res, next) {
        try {
            const { userId, name, icon, color } = req.body;
            const candidate = await Category.findOne({
                where: { name, userId },
            });
            if (candidate) {
                return next(
                    ApiError.badRequest(
                        "Категория с таким именем уже существует"
                    )
                );
            }
            const token = generateJwt(req.user.id, req.user.email);
            const category = await Category.create({
                userId,
                name,
                icon,
                color,
            });
            return res.json({ category, token });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async edit(req, res, next) {
        try {
            const { id, userId, name, icon, color } = req.body;
            const token = generateJwt(req.user.id, req.user.email);
            const candidate = await Category.findOne({
                where: { name, userId },
            });
            if (candidate && candidate.id !== id) {
                return next(
                    ApiError.badRequest(
                        "Категория с таким именем уже существует"
                    )
                );
            }
            const updatedCategory = await Category.update(
                {
                    name: name,
                    icon: icon,
                    color: color,
                },
                { where: { id }, returning: true }
            );
            return res.json({ updatedCategory, token });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id, userId } = req.body;
            const token = generateJwt(req.user.id, req.user.email);
            const expenseWithCategory = await Expense.findOne({
                where: { categoryId: id, userId },
            });
            if (expenseWithCategory) {
                return next(
                    ApiError.badRequest(
                        "This category is used in your expenses"
                    )
                );
            }
            const deletedCategory = await Category.destroy({
                where: { id, userId },
            });

            return res.json({ deletedCategory, token });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const { userId } = req.query;
            const categories = await Category.findAll({
                where: { userId },
                order: ["createdAt"],
            });
            return res.json(categories);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new CategoryController();

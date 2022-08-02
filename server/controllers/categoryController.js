const { Category } = require("../models/models");
const ApiError = require("../error/ApiError");

class CategoryController {
    async create(req, res, next) {
        const { userId, name, icon, color } = req.body;
        const candidate = await Category.findOne({ where: { name, userId } });
        if (candidate) {
            return next(
                ApiError.badRequest("Категория с таким именем уже существует")
            );
        }
        const category = await Category.create({ userId, name, icon, color });
        return res.json(category);
    }

    async getAll(req, res) {
        const categories = await Category.findAll();
        return res.json(categories);
    }
}

module.exports = new CategoryController();

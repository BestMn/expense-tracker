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

    async edit(req, res) {
        const { id, userId, name, icon, color } = req.body;
        await Category.update(
            {
                name: name,
                icon: icon,
                color: color,
            },
            { where: { id } }
        );
        console.log("DASASDASD", res.json());
        return res.json();
    }

    async getAll(req, res) {
        const { userId } = req.query;
        const categories = await Category.findAll({
            where: { userId },
        });
        return res.json(categories);
    }
}

module.exports = new CategoryController();

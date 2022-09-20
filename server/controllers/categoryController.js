const { Category } = require("../models/models");
const ApiError = require("../error/ApiError");
const jwt = require("jsonwebtoken");

const generateJwt = (id, email) => {
    return jwt.sign({ id, email }, process.env.SECRET_KEY, {
        expiresIn: "4h",
    });
};

class CategoryController {
    async create(req, res, next) {
        const { userId, name, icon, color } = req.body;
        const candidate = await Category.findOne({ where: { name, userId } });
        if (candidate) {
            return next(
                ApiError.badRequest("Категория с таким именем уже существует")
            );
        }
        const token = generateJwt(req.user.id, req.user.email);
        const category = await Category.create({ userId, name, icon, color });
        return res.json({ category, token });
    }

    async edit(req, res) {
        const { id, userId, name, icon, color } = req.body;
        const token = generateJwt(req.user.id, req.user.email);
        const updatedCategory = await Category.update(
            {
                name: name,
                icon: icon,
                color: color,
            },
            { where: { id }, returning: true }
        );
        return res.json({ updatedCategory, token });
    }

    async delete(req, res) {
        const { id, userId } = req.body;
        const token = generateJwt(req.user.id, req.user.email);
        const deletedCategory = await Category.destroy({
            where: { id, userId },
        });

        return res.json({ deletedCategory, token });
    }

    async getAll(req, res) {
        const { userId } = req.query;
        const categories = await Category.findAll({
            where: { userId },
            order: ["createdAt"],
        });
        return res.json(categories);
    }
}

module.exports = new CategoryController();

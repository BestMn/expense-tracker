const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");

const generateJwt = (id, email) => {
    return jwt.sign({ id, email }, process.env.SECRET_KEY, {
        expiresIn: "4h",
    });
};

class UserController {
    async registration(req, res, next) {
        const { email, password, nickName, firstName, secondName } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest("Некорректный email или password"));
        }
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(
                ApiError.badRequest("Пользователь с таким email уже существует")
            );
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({
            email,
            nickName,
            firstName,
            secondName,
            password: hashPassword,
            userCurrency: "₽",
        });
        const token = generateJwt(user.id, user.email);
        return res.json({ token, userId: user.id });
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.internal("Пользователь не найден"));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal("Указан неверный пароль"));
        }
        const token = generateJwt(user.id, user.email);
        return res.json({
            token,
            userId: user.id,
            userCurrency: user.userCurrency,
        });
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email);
        return res.json({ token, userId: req.user.id });
    }

    async getUserInfo(req, res) {
        const { userId } = req.query;
        const user = await User.findOne({
            where: { id: userId },
        });
        return res.json(user);
    }

    async edit(req, res) {
        const { id, nickName, firstName, secondName, phoneNumber, currency } =
            req.body;
        const token = generateJwt(req.user.id, req.user.email);

        const updatedUser = await User.update(
            {
                nickName,
                firstName,
                secondName,
                phoneNumber,
                userCurrency: currency,
            },
            { where: { id }, returning: true }
        );
        return res.json({ ...updatedUser, token });
    }
}

module.exports = new UserController();

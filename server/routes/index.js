const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");
const expenseRouter = require("./expenseRouter");

router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/expense", expenseRouter);

module.exports = router;

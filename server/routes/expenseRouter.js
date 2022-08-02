const Router = require("express");
const router = new Router();
const expenseController = require("../controllers/expenseController");

router.post("/", expenseController.create);
router.get("/", expenseController.getAll);
router.get("/:id", expenseController.getOne);

module.exports = router;

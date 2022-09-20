const Router = require("express");
const router = new Router();
const expenseController = require("../controllers/expenseController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, expenseController.create);
router.get("/", authMiddleware, expenseController.getAll);
router.patch("/", authMiddleware, expenseController.edit);
router.delete("/", authMiddleware, expenseController.delete);

module.exports = router;

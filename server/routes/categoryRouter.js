const Router = require("express");
const router = new Router();
const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, categoryController.create);
router.patch("/", authMiddleware, categoryController.edit);
router.get("/", authMiddleware, categoryController.getAll);
router.delete("/", authMiddleware, categoryController.delete);

module.exports = router;

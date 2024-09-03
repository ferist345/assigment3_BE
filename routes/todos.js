const { index, show } = require("../controllers/todos.controller");

const router = require("express").Router();

router.get("/", index);
router.get("/:id", show);
router.post("/");
router.put("/:id");
router.delete("/:id");

module.exports = router;

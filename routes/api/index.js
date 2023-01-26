var router = require("express").Router();

router.use("/authors", require("./authors"));
router.use("/books", require("./books"));
router.use("/orders", require("./orders"));
router.use("/user", require("./user"));

module.exports = router;

const router = require("express").Router();
const auth = require("../../middleware/auth");
const orders = require("../../models/Order");
const Books = require("../../models/Books");

router.post("/addOrder", auth.isLogin, (req, res) => {
      const newOrder = new orders();
      newOrder.user = req.user.id;
      newOrder.books = req.body.titles;
      newOrder
        .save()
        .then((result) => {
          res.status(200).send("Order Complete");
        })
        .catch((err) => {
          res.status(444).send("Something went wrong");
        });
});

module.exports = router;

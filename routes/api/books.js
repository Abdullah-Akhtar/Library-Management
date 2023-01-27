const router = require("express").Router();
const auth = require("../../middleware/auth");
const Books = require("../../models/Books");

router.post("/addBook", auth.isAdmin, (req, res) => {
  const newbook = new Books({
    title: req.body.title,
    auther: req.body.auther,
    price: req.body.price,
    quantity: req.body.quantity,
  });
  newbook
    .save()
    .then((result) =>
      res.status(201).send({ msg: `Book added successfully ${newbook}` })
    )
    .catch((err) => res.status(403).send({ msg: "Something went wrong" }));
});

router.post("/search", (req, res) => {
  Books.find(
    {
      $or: [
        { auther: { $regex: req.body.search, $options: "i" } },
        { title: { $regex: req.body.search, $options: "i" } },
      ],
    },
    function (err, names) {
      if (err) {
        return res.status(400).send(err);
      }
      return res.send(names);
    }
  );
});
module.exports = router;

const router = require("express").Router();
const auth = require("../../middleware/auth");
const Books = require("../../models/Books");

////////////////////////////////////////
////////////Adding new books////////////
////////////////////////////////////////
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
////////////////////////////////////////
////////////updating books//////////////
////////////////////////////////////////
router.post("/updatebook/:search", auth.isAdmin, (req, res) => {
  Books.updateOne(
    {
      $or: [{ auther: req.params.search }, { title: req.params.search }],
    },
    {
      
    },
    (err, names) => {
      if (!err & names) {
        res.send(names);
      } else res.send(err);
    }
  );
});

////////////////////////////////////////
////////////Delete book////////////
////////////////////////////////////////
router.delete("/remBook", auth.isAdmin, (req, res) => {
  Books.deleteOne({ title: req.body.title }, (err, data) => {
    if (!err && data) {
      res.send("Book Deleted Successfully");
    }
    if (!data) {
      res.send("Title not found");
    }
  });
});

////////////////////////////////////////
////////////Searching books////////////
////////////////////////////////////////
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

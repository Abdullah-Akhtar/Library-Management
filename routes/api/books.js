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
  Books.findOne(
    {
      $or: [{ auther: req.params.search }, { title: req.params.search }],
    },
    (err, names) => {
      if (!err && names) {
        console.log(names);
        names.title = req.body.title ? req.body.title : names.title;
        names.auther = req.body.auther ? req.body.auther : names.auther;
        names.price = req.body.price ? req.body.price : names.price;
        console.log(names);
        names
          .save()
          .then((result) =>
            res.status(201).send({ msg: `Book Updated successfully ${result}` })
          )
          .catch((err) =>
            res.status(403).send({ msg: "Something went wrong" })
          );
      }else if(err || !names ){
        res.send("Nothing found");
      }
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
      if (err || !names.length) {
        return res.status(400).send("Nothing Found.");
      }
      return res.send(names);
    }
  );
});

module.exports = router;

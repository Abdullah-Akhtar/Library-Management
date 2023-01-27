const router = require("express").Router();
const Users = require("../../models/User");
const auth = require("../../middleware/auth");

/////////////////////////////////////
////////Creating new User///////////
///////////////////////////////////
router.post("/addUser", (req, res) => {
  const newUser = new Users();
  (newUser.username = req.body.username), (newUser.email = req.body.email);
  newUser.setPassword(req.body.password);
  newUser
    .save()
    .then((result) =>
      res.status(201).send({ msg: `User created successfully ${newUser}` })
    )
    .catch((err) => res.status(403).send({ msg: "Something went wrong" }));
});

/////////////////////////////////////
////////Sign In User////////////////
///////////////////////////////////
router.post("/signIn", auth.isEmail, auth.token, (req, res) => {
  res.send(req.token);
});

/////////////////////////////////////
////////Get All User////////////////
///////////////////////////////////
router.get("/getUser", auth.isAdmin, (req, res) => {
  Users.find({}, (err, names) => {
    if (!err) {
      res.send(names);
    } else res.send(err);
  });
});

/////////////////////////////////////
////////Change User information/////
///////////////////////////////////
router.put("/changeinfo", auth.isLogin, (req, res) => {
  req.user.email = req.body.email ? req.body.email : req.user.email;
  req.user.username = req.body.username ? req.body.username : req.user.username;
  req.body.password ? req.user.setPassword(req.body.password) : "";
  req.user
    .save()
    .then((result) =>
      res.status(201).send({ msg: `User Updated successfully ${result}` })
    )
    .catch((err) => res.status(403).send({ msg: "Something went wrong" }));
});

/////////////////////////////////////
////////User Delete/////////////////
///////////////////////////////////
router.delete("/delUser", auth.isLogin, (req, res) => {
  Users.deleteOne({ email: req.user.email }, (err) => {
    if (!err) res.status(200).send({ msg: "User deleted successfully" });
  });
});

module.exports = router;

const router = require("express").Router();
const Users = require("../../models/User");
const auth = require("../../middleware/auth");

/////////////////////////////////////
////////Adding new User/////////////
///////////////////////////////////
router.post("/addUser", (req, res) => {
  const newUser = new Users({
    username: req.body.username,
    email: req.body.email,
  });
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
  const newData = new Users({
    email: req.body.email,
    username: req.body.username,
  });
  newData.setPassword(req.body.password);
  Users.updateOne(
    { email: req.user.email },
    {
      email: newData.email,
      password: newData.password,
      username: newData.username,
    }
  )
    .then((result) =>
      res.status(201).send({ msg: `User Updated successfully ${newData}` })
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
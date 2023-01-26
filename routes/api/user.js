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
    newUser.save()
      .then((result) =>
        res.status(201).send({ msg: `User created successfully ${newUser}` })
      )
      .catch((err) => res.status(403).send({ msg: "Something went wrong" }));
  });

/////////////////////////////////////
////////Sign In User////////////////
///////////////////////////////////
router.post("/getUser", auth.isEmail, auth.token, (req, res) => {
    
    res.send("Working");
});



/////////////////////////////////////
////////get All Users///////////////
///////////////////////////////////
// router.get("/get", (req, res) => {
//   // Then Catch method
//   // Users.find({}).then(()=>{}).catch((err)=>{})
//   Users.find({}, function (err, names) {
//     if (err) {
//       return res.status(400).send(err);
//     }
//     return res.send(names);
//   });
// });

////////////////////////////////////////////
///////////Find User by Email//////////////
//////////////////////////////////////////
// router.get("/getUser/:email", (req, res) => {
//   Users.find({ email: req.params.email }, (err, data) => {
//     if (!err) res.status(302).send(data);
//     res.end();
//   });
// });
// /////////////////////////////////////////////
// ///////////Delete User by Email/////////////
// ///////////////////////////////////////////
// router.delete("/deleteUser/:email", (req, res) => {
//   Users.findOne({ email: req.params.email }, (err, data) => {
//     if (err || !data) return res.send("Email does not Match");
//     Users.deleteOne({ email: req.params.email }, (err) => {
//       if (!err) res.status(200).send({ msg: "User deleted successfully" });
//     });
//   });
// });
// /////////////////////////////////////////////
// ///////////Update User by email/////////////
// ///////////////////////////////////////////
// router.put("/updateUser/:email", (req, res) => {
//   Users.updateOne(
//     { email: req.params.email },
//     { name: req.body.name, password: req.body.password, email: req.body.email },
//     (err, result) => {
//       //   if (!err) res.status(200).send({ msg: "User Updated successfully" });
//       if (err) return res.status(400).send(err);
//       return res.status(200).send({ msg: "User Updated successfully" });
//     }
//   );
// });
module.exports = router;

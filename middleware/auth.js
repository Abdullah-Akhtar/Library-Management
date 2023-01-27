const Users = require("../models/User");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

// async function isEmail(req, res, next) {
const isEmail = (req, res, next) => {
  Users.findOne({ email: req.body.email }, (err, data) => {
    if (err) {
      return res.status(400).send(err);
    } else if (!data) {
      return res.status(444).send("Email Does not Exists");
    }
    if (bcrypt.compareSync(req.body.password, data.password) === false) {
      return res.status(444).send("Password Does not Match");
    }
    next();
  });
};
const token = (req, res, next) => {
  var jwt = require("jsonwebtoken");
  var token = jwt.sign({ foo: req.body.email }, "abcdf");
  req.token = token;
  next();
};
const isAdmin = (req, res, next) => {
    var token = req.headers['token'];
    var decoded = jwt.verify(token, 'abcdf');
    Users.findOne( { email: decoded.foo }, (err, data) => {
        if (err) return res.status(302).send(err);
        if(!data) return res.status(444).send("You are not an Admin");
        next()
    });
};

module.exports = { isEmail, token, isAdmin };
const Users = require("../models/User");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

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

const gettoken = (req) => {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }

  return null;
};

const token = (req, res, next) => {
  var jwt = require("jsonwebtoken");
  var token = jwt.sign({ foo: req.body.email }, "abcdf");
  req.token = token;
  next();
};

const isAdmin = (req, res, next) => {
  let token = gettoken(req);
  var decoded = jwt.verify(token, "abcdf");
  Users.findOne({ email: decoded.foo }, (err, data) => {
    if (err) return res.status(302).send(err);
    if (data.role !== 1) return res.status(444).send("You are not an Admin");
    next();
  });
};
const isLogin = (req, res, next) => {
  let token = gettoken(req);
  if (!token) res.send("Please Sign In");
  var decoded = jwt.verify(token, "abcdf");
  Users.findOne({ email: decoded.foo }, (err, data) => {
    if (err) return res.status(302).send(err);
    if (!data) return res.status(444).send("You are not Valid User");
    req.user = data;
    next();
  });
};

module.exports = { isEmail, token, isAdmin, isLogin };

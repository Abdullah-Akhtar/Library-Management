const Users = require("../models/User");
const bcrypt = require("bcrypt");

// async function isEmail(req, res, next) {
const isEmail =  ( req, res, next ) => {
    Users.findOne({ email: req.body.email }, (err, data) => {
        if (err){
            return res.status(400).send(err);
        }else if(!data){
            return res.status(444).send("Email Does not Exists");
        }
        if(bcrypt.compareSync(req.body.password, data.password) === false){
            return res.status(444).send("Password Does not Match");
        }
        next()
    });
};
const token = (req, res, next) => {
    var jwt = require('jsonwebtoken');
            var token = jwt.sign({ foo: req.query.email }, 'abcdf');
            req.token = token;
            next()
}
const isSame = function (req, res, next) {
    // let check = bcrypt.compareSync(req.body.password, req.temp.password);
    //     if (check === false){
    //         return res.status(444).send("Password Does not Exists");
    //     }else {
    //         res.send("Password Match");
    //     }
};


module.exports = { isEmail, isSame, token};
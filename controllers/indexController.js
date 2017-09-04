
const currentDataObj = require('../db/index');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;






/*=============POST FOR INDEX PAGE===============
=======================================================*/

//  var userTestObj = {
//   'username': 'daring',
//   'password': 'tofinderror',
//   'secondPassword': 'tofinderror',
// }


module.exports.post = (req, res) => {
console.log(req);
    req
        .checkBody('username', 'name is required')
        .notEmpty()

    req
        .checkBody('password', 'password is required')
        .notEmpty();
    req
        .checkBody('secondPassword', 'confirm password')
        .notEmpty()
        .equals(req.body.password);

    req.sanitizeBody('username').escape();
    req.sanitizeBody('password').escape();
    req.sanitizeBody('secondPassword').escape();

    const input = {
        username: req.body.username,
        password: req.body.password,
        secondPassword: req.body.secondPassword,
    }

    // console.log(input);
    // if(err){
    //   res.send(err);
    //   console.log(err);
    // }


    currentDataObj.newUser(input, (err) => {
        console.log(err)
        res.send(err);
        if (err) {
            console.log(err);
            res.send(err);
        }
        console.log('I have hit line 49');
        console.log(err)
        res.redirect('/login');
    })



}




// module.exports.post(userTestObj);
/*================LOGIN USER==========
====================================================*/








module.exports.contLoginUser = (req, res, hash) => {

    req
        .checkBody('username', 'name is required')
        .notEmpty()

    req
        .checkBody('password', 'password is required')
        .notEmpty();

    req.sanitizeBody('username').escape();
    req.sanitizeBody('password').escape();

    const password = req.body.password;
    const username = req.body.username;

console.log(password);
console.log(username);
/*=============================================
========== NEWLY ADDED=========================
===============================================*/

    passport.use(new LocalStrategy(
     (username, password, done) => {
        getUserByUserName(username, (err, user) => {
          if (err) {
            return done(err)
          }

          // User not found
          if (!user) {
            return done(null, false)
           }


          // Always use hashed passwords and fixed time comparison
          bcrypt.compare(password, user.passwordHash, (err, isValid) => { //user could be undefined as well as passwordHash
            if (err) {
              return done(err)
            }
            if (!isValid) {
              return done(null, false)
            }
            return done(null, user)
          })
        })
      }
    ))
       res.redirect('/');
}

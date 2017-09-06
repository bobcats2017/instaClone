const currentDataObj = require('../db/index');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const multer = require('multer');
const path = require('path');




/*=============POST FOR INDEX PAGE===============
=======================================================*/

//  var userTestObj = {
//   'username': 'daring',
//   'password': 'tofinderror',
//   'secondPassword': 'tofinderror',
// }


module.exports.post = (req, res) => {

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




    currentDataObj.newUser(input, (err) => {

        if (err) {
            console.log(err);
            res.send(err);
        }
        res.redirect('/login');
    })



}

/*================Passport Middleware==========
====================================================*/

module.exports.authenticationMiddleware = (req, res, next) => {

    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
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


/*================uploadImages/ multer==========
====================================================*/
module.exports.deletePost = (req, res) => {

  const input = {
      username: req.body.username,
      hashtag: req.body.hashtag,
      description: req.body.description,
  }

  currentDataObj.deletePicture(input, (err) => {

      if (err) {
          console.log(err);
          res.send(err);
      }

      res.redirect('/');
  })




}




/*================POST IMAGES to homeStream==========
====================================================*/
module.exports.postImages = (req, res) => {

    req
        .checkBody('username', 'name is required')
        .notEmpty()

    req
        .checkBody('description', 'password is required')
        .notEmpty();
    req
        .checkBody('hashtag', 'hashtag not required')



    req.sanitizeBody('username').escape();
    req.sanitizeBody('description').escape();
    req.sanitizeBody('hashtag').escape();
    //req.sanitizeBody('title').escape();


    const input = {
        username: req.body.username,
        description: req.body.description,
        hashtag: req.body.hashtag,
        image: req.body.image,
        //title: req.body.title
    }

    currentDataObj.attachPicture(input, (err) => {

        if (err) {
            console.log(err);
            res.send(err);
        }

        res.redirect('/homeStream');
    })





}

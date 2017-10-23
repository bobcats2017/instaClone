const currentDataObj = require('../db/index');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const multer = require('multer');
const path = require('path');

/*=============POST FOR INDEX PAGE===============
=======================================================*/

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
            return res.send(err);
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
                bcrypt.compare(password, user.password, (err, isValid) => { //user could be undefined as well as passwordHash

                    console.log(req.secondPassword);
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
    const post_id = req.body.post_id;

    currentDataObj.deletePicture(parseInt(post_id), (err) => {
        if (err) {
            const message = err.errno === -2 ? defaultMessage : 'Try again later';
            console.log(err);
            // make sure we only render once!!! so return
            return res.render('404', {
                message: err.message
            });
        }

        res.redirect('/homeStream');
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

    req
        .checkBody('image', 'image needs to be valid') //???
        .notEmpty();

    req.sanitizeBody('username').escape();
    req.sanitizeBody('description').escape();
    req.sanitizeBody('hashtag').escape();
    req.sanitizeBody('image').escape();

    const input = {
        username: req.body.username,
        description: req.body.description,
        hashtag: req.body.hashtag,
        image: req.file.path ? encodeURI(req.file.path.split('public/').pop()) : encodeURI(req.body.image),
    }

    currentDataObj.attachPicture(input, (err) => {

        if (err) {
            console.log(err);
            res.send(err);
        }

        res.redirect('/homeStream');
    })

}

/*================POST COMMENTS to homeStream==========
====================================================*/

module.exports.addComment = (req, res) => {
    console.log(req.file);
    req
        .checkBody('description', 'description is required')
        .notEmpty();

    req.sanitizeBody('description').escape();

    const input = {
        user_id: req.body.user_id,
        description: req.body.description,
        post_id: req.body.post_id,
    }

    currentDataObj.addComment(input, (err) => {

        if (err) {
            console.log(err);
            res.send(err);
        }

        res.redirect('/homeStream');
    })

}

/*===========RENDER post_id to editPost===========*/

module.exports.showArticles = function(request, response) {
    currentDataObj.getAllArticles(function(err, list) {
            console.log(list);
        if (err) {
            const message = err.errno === -2 ? defaultMessage : 'Try again later';

            // make sure we only render once!!! so return
            return response.render('404', {
                message: message
            });
        }

        response.render('homeStream', {
            articles: list
        });
    })
}



/*==================SHOW EDITED POST=================*/
module.exports.showEditedPost = function(request, response) {
    const id = parseInt(request.params.post_id);
    currentDataObj.getOneArticle(id, function(err, articles) {
        if (err) {
            const message = err.errno === -2 ? defaultMessage : 'Try again later';
            // make sure we only render once!!! so return
            return response.render('404', {
                message: message
            });
        }
        const place = articles.rows[0]
        // console.log('this is res.rows' + articles.fields[0])

        response.render('editPost', {article: {
            article: place.post_id,
            description: place.description,
            image: place.images, //might be file path
            hashtag: place.hashtag
        }});
    })
}

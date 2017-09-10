require('dotenv').config()

/*================importing packages==============*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const indexController = require('./controllers/indexController');
const flash = require('connect-flash');
const multer = require('multer');
/*============Setting Packages to be used by App=============*/
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(expressValidator())
app.set('views', path.join(__dirname, 'views')); //Maybe unneccessary
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));


/*============PASSPORT/SESSIONS/FLASH================
====================================*/

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


/*============ROUTES================================
=====================================================*/

/*===indexLogin route===*/
app.get('/', (req, res) => {
    res.render('index');
})
app.get('/login', (req, res) => { //maybe in post
    res.render('login');
})

/*===============UPLOAD IMAGES ROUTE===================
=====================================================*/

const storage = multer.diskStorage({

    destination: function(req, file, cb) {
        cb(null, './file_uploader');
    },
    filename: function(req, file, cb) {
        const extension = (path.extname(file.originalname)).toLowerCase();
        cb(null, file.fieldname + '-' + Date.now() + '.jpg') //could be .jpg
    }
});

const uploadRequestHandler = multer ({ storage: storage });

app.get('/uploadImage', (req, res) => {
    res.render('uploadImage');
})

app.get('/homeStream', (req, res) => {
    res.render('homeStream');
})

//var upload = multer({ dest: './file_uploader'  });


app.post('/homeStream',uploadRequestHandler.single('image'), indexController.postImages)
/*===Post routes===*/

app.post('/', indexController.post);

app.post('/login', indexController.authenticationMiddleware, indexController.contLoginUser);

app.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/logout');
    });
});

app.get('/deleteImage', (req, res) => {
    res.render('deleteImage');
})

app.post('/deleteImage', indexController.deletePost);


app.listen(3000, () => {
    console.log('web server running');
})

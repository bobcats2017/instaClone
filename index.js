
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
//the below code might cause errors due to order
const indexController = require('./controllers/indexController');
const flash = require('connect-flash');
const multer = require('multer');
/*============Setting Packages to be used by App=============*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator())
app.set('views', path.join(__dirname, 'views')); //Maybe unneccessary
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
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


/*============MULTER STORAGE========================================
=====================================================================*/

var upload = multer({ storage: storage }).single('userImage');

var storage = multer.diskStorage({
destination: function (req, file, cb) {
  cb(null, '/file_uploader')
},
filename: function (req, file, cb) {
  cb(null, file.fieldname + '-' + Date.now() + '.jpg')
}
})


/*============ROUTES================================
=====================================================*/

app.get('/', (req, res) => {
  res.render('index');
})
app.get('/login', (req, res) => { //maybe in post
  res.render('login');
})
app.get('/homeStream', (req, res) => {
  res.render('homeStream');
})
app.get('/uploadImage', (req, res) => {
  res.render('uploadImage');
})


app.post('/', indexController.post);

app.post('/login',  indexController.authenticationMiddleware, indexController.contLoginUser);

app.get('/logout', function (req, res){
  req.session.destroy(function (err) {
    res.redirect('/logout');
  });
});

app.post('/homeStream', indexController.uploadImagesMiddleware, indexController.)
//
// var upload = multer({ storage: storage }).single('userImage');
//
// app.post('/homeStream', function (req, res) {
//   upload(req, res, function (err) {
//     if (err) {
//
//       return
//     }
//     res.json({
//       success: true,
//       message: 'Image Uploaded!!!'
//     })
// console.log('success!')
//   })
// })



app.listen(3000, () => {
  console.log('web server running');
})

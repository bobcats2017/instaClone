
require('dotenv').config()

/*================importing packages==============*/
const express = require('express');
const app = express();
const parser = require('body-parser');
const expressValidator = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; //not sure if we need to use this
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
//the below code might cause errors due to order
const indexController = require('./controllers/indexController');


/*============Setting Packages to be used by App=============*/

app.set('views', path.join(__dirname, 'views')); //Maybe unneccessary
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieParser());
app.use(parser.urlencoded({extended: false}));
app.use(parser.json());
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));

//Express Session




app.use(passport.initialize());
app.use(passport.session());





app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true

}));

// app.use(expressValidator({ //taken from express-validator github
//   errorFormatter: function(param,msg,value){
//     var namespace = param.split('.'),
//      root = namespace.shift(),
//      formParam = root;
//
//      while(namespace.length){
//        formParam += '[' + namespace.shift() + ']';
//      }
//      return {
//        param: formParam,
//        msg: msg,
//        value: value
//      }
//   }
// }));

/*============ROUTES================*/



app.get('/', (req, res) => {
  res.render('index');
})
app.get('/login', (req, res) => {
  res.render('login');
})

app.post('/login', indexController.post);



app.listen(3000, () => {
  console.log('web server running');
})

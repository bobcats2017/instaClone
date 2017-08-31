<<<<<<< HEAD
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
//the below code might cause errors due to order

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

app.use(expressValidator({ //taken from express-validator github
  errorFormatter: function(param,msg,value){
    var namespace = param.split('.'),
     root = namespace.shift(),
     formParam = root;

     while(namespace.length){
       formParam += '[' + namespace.shift() + ']';
     }
     return {
       param: formParam,
       msg: msg,
       value: value
     }
  }
}));

const indexController = require('./controllers/indexController');

/*============ROUTES================*/



app.get('/', (req, res) => {
  res.render('index');
})

app.post('/', indexController.post);

app.listen(3000, () => {
  console.log('web server running');
})
=======
const express = require('express');
const path = require('path');

const app = express();

const parser = require('body-parser');
const expressValidator = require('express-validator');
const multer = require('multer')

const upload = multer ({dest:"public/uploads"})

app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

app.use(expressValidator({
    customValidators: {
      isImage: function(value, filename) {
        const extension = (path.extname(filename)).toLowerCase();
        return ['.gif', '.jpg', 'jpeg', '.png', '.svg'].indexOf(extension) !== -1;
      }
    }
  }));

app.use(express.static('public'));



app.set('view engine', 'ejs');


app.get('/', (request, response) => {
    response.render('index.ejs') ;
});

app.get('/userEdit', (request, response) => {
    response.render('userEdit.ejs') ;
});

app.get('/userPage', (request, response) => {
    response.render('userPage.ejs') ;
});

app.get('/userLogin', (request, response) => {
    response.render('userLogin.ejs') ;
});

const server = app.listen(process.env.PORT || 8089, () => {
    console.log('started')
});
>>>>>>> master

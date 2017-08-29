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

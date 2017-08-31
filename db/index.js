require('dotenv').config()
const pg = require('pg');

const pgObj = new pg.Pool({
  user: 'dan',
  host: '127.0.0.1',
  database: 'instaclone',
  password: 'Paradise21', //never allow password to be viewed by anyone
  port: 5432,
});




const addUser = 'INSERT INTO users (username, password, secondPassword) VALUES ($1, $2, $3)';


 const newUser = (data, callback) => {

const loginObj = [
  data.username,
  data.password,
  data.secondPassword,
]


  pgObj.query(addUser, loginObj,callback, (err, res) => {
      callback(err, res);
    })

}

// newUser({
//   username: 'da',
//   password: 'daniel',
//   secondPassword: 'danielWinsidjoaf',
// });


/*============"**OBJECT DATABASE YOU WILL BE PULLING FROM** LIZ"======================*/
/*You can add and modify this object at any time, when you use this object, I am going to
  modify the database accordingly because you are only in controller/views right now
  If you need help grabbing the json obj's hit me up */

module.exports.get = function(req, res){

  var posts = {
    'title': 'title',
    'image': 'image',
    'body': 'body',
    'comments': [
      {
        'username': 'username',
        'title': 'title',
        'body': 'body',

      },
      {
        'username': 'Layne Staley',
        'title': 'my chicken is overdone',
        'body': 'Ur Momma'
      }
    ]
  }
callback(null, posts);
}

module.exports.newUser = newUser;

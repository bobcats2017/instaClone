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


module.exports.newUser = newUser;

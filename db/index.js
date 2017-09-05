require('dotenv').config()
const pg = require('pg');



const pgObj = new pg.Pool({
  user: 'dan',
  host: '127.0.0.1',
  database: 'instaclone',
  password: 'Paradise21', //never allow password to be viewed by anyone
  port: 5432,
});

/*======*****PG OBJECTS*****===================
=====================================================*/
const addUser = 'INSERT INTO users (username, password, secondPassword) VALUES ($1, $2, $3)';
const userName = "SELECT * FROM users WHERE username=$1"
const userId = 'SELECT id FROM users WHERE id=$1'
const addPicture = 'INSERT INTO posts (username, description, hashtag, images) VALUES ($1, $2, $3, $4)';
/*======*****ADD USER*****===================
=====================================================*/

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

/*================GET USER BY USERNAME====Ubiq======
====================================================*/

const getUserByUserName = (data, callback) => {

  const loginObj = [data.username]; //Query values must be an array

  pgObj.query(userName,loginObj, callback, (err, res) => {

      callback(err, res);
    })
}



/*================GET USER BY ID====Ubiq======
====================================================*/

const getUserById = (data, callback) => {
  const inputUserId = [data.id]; //could be null

    pgObj.query(userId, inputUserId , callback, (err, res) => {
        callback(err, res);
      })
}


/*================ADD PICTURE TO HOMESTREAM====Ubiq======
====================================================*/







/*======*****EXPORTS*****===================
=====================================================*/

module.exports.newUser = newUser;
module.exports.getUserById = getUserById;
module.exports.getUserByUserName = getUserByUserName;

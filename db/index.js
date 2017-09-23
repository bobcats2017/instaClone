require('dotenv').config()
const pg = require('pg');



const pgObj = new pg.Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'testdb',
  password: 'G0disg00d1410', //never allow password to be viewed by anyone
  port: 5432,
});


/*======*****PG OBJECTS*****===================
=====================================================*/
const addUser = 'INSERT INTO users (username, password, secondPassword) VALUES ($1, $2, $3)';
const userName = "SELECT * FROM users WHERE username=$1"
const userId = 'SELECT id FROM users WHERE id=$1'
const addPicture = 'INSERT INTO posts (username, description, hashtag, images) VALUES ($1, $2, $3, $4)';
const removePicture = 'DELETE FROM posts WHERE post_id=$1';
const changePicture = 'ALTER TABLE posts WHERE ';/////////////////not finished
const getArticles = 'SELECT * FROM posts';
const addCommentSql = 'INSERT INTO comments (user_id, description, post_id) VALUES ($1, $2, $3)';
const getSpecificArticle = 'SELECT * FROM posts WHERE post_id=$1 limit 1';

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


/*================ADD PICTURE TO Database====Ubiq======
====================================================*/

const attachPicture = (data, callback) => {

  var postImageObj = [
      data.username,
      data.description,
      data.hashtag,
      data.image,
      //data.title,
  ] //Query values must be an array

  pgObj.query(addPicture,postImageObj, callback, (err, res) => {

      callback(err, res);
    })
}


const addComment = (data, callback) => {

var comment = [
    data.user_id,
    data.description,
    data.post_id,
  ]

  pgObj.query(addCommentSql, comment, callback, (err, res) => {
    callback(err, res);
  })
}

/*================DELETE PICTURE BY USERNAME AND HASHTAG====Ubiq======
=====================================================================*/

const deletePicture = (post_id, callback) => {

  //  var userInfo = [
  //     data.username,
  //     data.hashtag,
  //     data.description,
  // ] //Query values must be an array


  pgObj.query(removePicture, [post_id], (err, res) => {

      callback(err, res);
    })
}

/*================EDIT USER BY USERNAME AND HASHTAG ====Ubiq======
=====================================================================*/
const editPicture = (data, callback) => {

   var userInfo = [
      data.username,
      data.hashtag,
  ] //Query values must be an array


  pgObj.query(removePicture,userInfo, callback, (err, res) => {

      callback(err, res);
    })
}

/*================SHOW ALL ARTICLES ====Ubiq======
=====================================================================*/

const getAllArticles = function(callback) {
  pgObj.query(getArticles, null, (err, res) => {
    if (err) {
      callback(err)
    } else {
      callback (null, res.rows)
    }
  })
}


/*================GET ONE ARTICLE ====Ubiq======
=====================================================================*/
const getOneArticle = (data, callback) => {
  // console.log('this is the data!!: ' + data);
   //maybe post id

  pgObj.query(getSpecificArticle,[data],callback, (err, res) => {
      callback(err, res.rows[0]);
    })
}


/*======*****EXPORTS*****===================
=====================================================*/

module.exports.newUser = newUser;
module.exports.getUserById = getUserById;
module.exports.getUserByUserName = getUserByUserName;
module.exports.attachPicture = attachPicture;
module.exports.deletePicture = deletePicture;
module.exports.editPicture = editPicture;
module.exports.getAllArticles = getAllArticles;
module.exports.addComment = addComment;
module.exports.getOneArticle = getOneArticle;

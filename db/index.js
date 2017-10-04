require('dotenv').config({path: '../.env'});
const pg = require('pg');



const pgObj = new pg.Pool({
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD, //never allow password to be viewed by anyone
    port: process.env.PGPORT,
});

/*======*****PG OBJECTS*****===================
=====================================================*/
const addUser = 'INSERT INTO users (username, password, secondPassword) VALUES ($1, $2, $3)';
const userName = "SELECT * FROM users WHERE username=$1"
const userId = 'SELECT id FROM users WHERE id=$1'
const addPicture = 'INSERT INTO posts (username, description, hashtag, images) VALUES ($1, $2, $3, $4)';
const removePicture = 'DELETE FROM posts WHERE post_id=$1';
const changePicture = 'ALTER TABLE posts WHERE '; /////////////////not finished
const getArticles = 'SELECT * FROM posts';
const addCommentSql = 'INSERT INTO comments (user_id, description, post_id) VALUES ($1, $2, $3)';
const getSpecificArticle = 'SELECT * FROM posts WHERE post_id=$1 limit 1';
const uploadPosts = 'INSERT INTO portfolio (username, image, description, project_link) VALUES ($1, $2, $3, $4)'
const getAllBlogPosts = 'SELECT * FROM portfolio';
const deleteBlogPost = 'DELETE FROM portfolio WHERE post_id=$1';
/*======*****ADD USER*****===================
=====================================================*/

const newUser = (data, callback) => {

    const loginObj = [
        data.username,
        data.password,
        data.secondPassword,
    ]


    pgObj.query(addUser, loginObj, callback, (err, res) => {

        callback(err, res);
    })

}

/*================GET USER BY USERNAME====Ubiq======
====================================================*/

const getUserByUserName = (data, callback) => {

    const loginObj = [data.username]; //Query values must be an array

    pgObj.query(userName, loginObj, callback, (err, res) => {

        callback(err, res);
    })
}



/*================GET USER BY ID====Ubiq======
====================================================*/

const getUserById = (data, callback) => {
    const inputUserId = [data.id]; //could be null

    pgObj.query(userId, inputUserId, callback, (err, res) => {
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

    pgObj.query(addPicture, postImageObj, callback, (err, res) => {

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


    pgObj.query(removePicture, userInfo, callback, (err, res) => {

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
            callback(null, res.rows)
        }
    })
}


/*================GET ONE ARTICLE ====Ubiq======
=====================================================================*/
const getOneArticle = (data, callback) => {
    // console.log('this is the data!!: ' + data);
    //maybe post id

    pgObj.query(getSpecificArticle, [data], callback, (err, res) => {
        callback(err, res.rows[0]);
    })
}

/*================post to Posts database ====Ubiq======
=====================================================================*/
const postPortfolioCard = (data, callback) => {

    var userInfo = [
        data.username,
        data.image,
        data.description,
        data.project_link
    ]

    pgObj.query(uploadPosts, userInfo,callback, (err, res) => {
        callback(err, res);
    })

}

/*================SHOW ALL Blog Posts ==========
=====================================================================*/

const AllBlogPosts = function(callback) {
    pgObj.query(getAllBlogPosts, null, (err, res) => {
        if (err) {
            callback(err)
        } else {
            callback(null, res.rows)
        }
    })
}

/*================DELETE BLOG POSTS =================================
=====================================================================*/

const deletePost = (post_id, callback) => {

    pgObj.query( deleteBlogPost, [post_id], callback, (err, res) => {

        callback(err, res);
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
module.exports.postPortfolioCard = postPortfolioCard;
module.exports.AllBlogPosts = AllBlogPosts;
module.exports.deletePost = deletePost;

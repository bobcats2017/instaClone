const currentDataObj = require('../db/index');
const bcrypt = require('bcryptjs');


/*=============POST FOR INDEX PAGE===============
=======================================================*/
module.exports.post = function(req, res) {
req
 .checkBody('username', 'name is required')
 .notEmpty()

 req
 .checkBody('password', 'password is required')
 .notEmpty();
 req
 .checkBody('secondPassword', 'confirm password')
 .notEmpty()
 .equals(req.body.password);

 req.sanitizeBody('username').escape();
 req.sanitizeBody('password').escape();
 req.sanitizeBody('secondPassword').escape();

 const input = {
    username: req.body.username,
    password: req.body.password,
    secondPassword: req.body.secondPassword,
  }



currentDataObj.newUser(input, (err) => {
  console.log(err)
  if(err){
    console.log(err);
    res.send(err);
  }
  res.redirect('/');
})



}
/*================GET USER BY USERNAME====Ubiq======
====================================================*/


module.exports.getUserByUserName = function(username, callback){
  var query = {username: username};
  User.findOne(query, callback);
}
/*================GET USER BY ID====Ubiq======
====================================================*/

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

/*================GET USER BY ID==========
====================================================*/

module.exports.contLoginUser = (req, res) => {
  req
   .checkBody('username', 'name is required')
   .notEmpty()

   req
   .checkBody('password', 'password is required')
   .notEmpty();

   req.sanitizeBody('username').escape();
   req.sanitizeBody('password').escape();

  loginUser(req);
  res.redirect('/login');
}

const currentDataObj = require('../db/index');




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



module.exports.getUserByUserName = function(username, callback){
  var query = {username: username};
  User.findOne(query, callback);
}
module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}
module.exports.comparePassword = function(candidatePassword, hash, callback){







}

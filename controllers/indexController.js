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
  if(err){
    console.log(err);
    res.send(err);
  }else{
    res.render('NO current errors')
  }
  res.redirect('/');
})



}

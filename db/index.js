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







/*======*****ADDUSER*****===================
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

/*======*****LOGIN USER*****===================
=====================================================*/

const loginUser = (data, callback) => {

const loginObj = data.password;

	bcrypt.compare(loginObj, hash, function(err, isMatch) {
    	if(err){
        console.log('error hit at compare')
      }
    	callback(null, isMatch);
	});
/*to work I might have ot palce one inside another*/



bcrypt.genSalt(10, function(err, salt) { // not sure what 10 is referencing FRAGO
    bcrypt.hash(loginObj, salt, function(err, hash) {
        if(err){
          console.log(err);
        }
        console.log(data.password);
    });
});


}

/*======*****EXPORTS*****===================
=====================================================*/



module.exports.loginUser = loginUser;
module.exports.newUser = newUser;











// newUser({
//   username: 'da',
//   password: 'daniel',
//   secondPassword: 'danielWinsidjoaf',
// });


/*============"**OBJECT DATABASE YOU WILL BE PULLING FROM** LIZ"======================*/
/*You can add and modify this object at any time, when you use this object, I am going to
  modify the database accordingly because you are only in controller/views right now
  If you need help grabbing the json obj's hit me up */

// module.exports.get = function(req, res){

//   var posts = {
//     'title': 'title',
//     'image': 'image',
//     'body': 'body',
//     'comments': [
//       {
//         'username': 'username',
//         'title': 'title',
//         'body': 'body',
//
//       },
//       {
//         'username': 'Layne Staley',
//         'title': 'my chicken is overdone',
//         'body': 'Ur Momma'
//       }
//     ]
//   }
// callback(null, posts);
// }

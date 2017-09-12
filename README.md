# instaClone


                                               BobCatz Stream App



This is our Instagram clone. Its a website in which you can upload pictures to main gallery
and share your thoughts with friends! We used Node.js, PostgreSQL, EJS, BootStrap, and of course Express!
 Node librarys include multer, passport, pg, pg-migrator, and bcrypt. I hope you enjoy!  


Getting Started

To get the project up and running for development and testing, it will require the installations of the following packages:

npm install -g --save pg-migrator,
npm install -g --save pg,
npm install -g --save multer,
npm install ejs,
npm install -g --save  bcrypt,
npm install -g --save passport,
npm install -g --save connect-flash,
npm install -g --save express-validator,
npm install -g --save passport-local


Links to the following packagers to be installed:

pg-migrator: https://www.npmjs.com/package/pg-migrator

pg: https://www.npmjs.com/package/pg

multer: https://www.npmjs.com/package/multer

ejs: https://www.npmjs.com/package/ejs

bcrypt: https://www.npmjs.com/package/bcrypt

passport: https://www.npmjs.com/package/passport

express-validator: https://www.npmjs.com/package/express-validator

connect-flash: https://www.npmjs.com/package/connect-flash

passport-local: https://www.npmjs.com/package/passport-local



These instructions will get you a copy of the project up and running on your local machine for development and testing purposes:


-PG-MIGRATOR:

  To alter PostgreSQL tables you must run migrations when you want to update or revert changes to the
  database. To either update or revert changes to your database.
  For example if I wanted to create a simple database:

  1). Make a migration script in the project(SQL file)

  2)
  CREATE TABLE "user"
  (
     id serial,
     username character(20)  NOT NULL,
     name_surname character(50) NOT NULL,
     CONSTRAINT pk_user PRIMARY KEY (id),
     CONSTRAINT uk_user UNIQUE (username)
  )
  3) step into your project directory and type the following:  
  run pg-migrator postgres://username:password@localhost/testdb +1 in the terminal.
  4) and you have ran a migration!


  Using pg-migrator, You can either move forward a migration( make changes) or move backwards
  in migrations(revert changes). To move backwards or forwards simply:

   to step forward: run pg-migrator postgres://username:password@localhost/testdb +1 in the terminal.
   to step backwards:   run pg-migrator postgres://username:password@localhost/testdb -1 in the terminal.

  To update a database, simply create a file that is increased in value name, for example, if the last migration
  was 1-2.sql, simply add the new command to a 2-3.sql. So if I wanted to drop a column
  I would write this command inside a 2-3.sql:

  ALTER TABLE "table_name" DROP COLUMN "column-name";

   and then run the migration in the command line:
   run pg-migrator postgres://username:password@localhost/testdb +1

   and the database has been changed!


  -












Say what the step will be

Give the example

And repeat

until finished

End with an example of getting some data out of the system or using it for a little demo
Running the tests

Explain how to run the automated tests for this system
Break down into end to end tests

Explain what these tests test and why

Give an example

And coding style tests

Explain what these tests test and why

Give an example

Deployment

Add additional notes about how to deploy this on a live system
Built With

    Dropwizard - The web framework used
    Maven - Dependency Management
    ROME - Used to generate RSS Feeds

Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.
Versioning

We use SemVer for versioning. For the versions available, see the tags on this repository.
Authors

    Billie Thompson - Initial work - PurpleBooth

See also the list of contributors who participated in this project.
License

This project is licensed under the MIT License - see the LICENSE.md file for details
Acknowledgments

    Hat tip to anyone who's code was used
    Inspiration
    etc

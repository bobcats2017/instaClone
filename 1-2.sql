
CREATE TABLE "users"
(
   id serial PRIMARY KEY,
   username VARCHAR(25)  NOT NULL UNIQUE,
   password VARCHAR(30)  NOT NULL,
   secondPassword VARCHAR(25) NOT NULL,
   UNIQUE (id, username)
);


CREATE TABLE "posts"
(
  post_id serial PRIMARY KEY,
  user_id  integer UNIQUE,
  username VARCHAR(30),
  hashtag VARCHAR(30),
  image VARCHAR(30),
  description VARCHAR(80),
  FOREIGN KEY (user_id) REFERENCES users (id)
);



CREATE TABLE "comments"
(
  id serial PRIMARY KEY,
  post_id integer,
  hashtag VARCHAR(50),
  description VARCHAR(150),
  FOREIGN KEY (post_id) REFERENCES posts (post_id)
);


CREATE TABLE "hashtag"
(
  id serial PRIMARY KEY,
  hashtag VARCHAR(50)
);


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
  username VARCHAR(30) UNIQUE,
  hashtag VARCHAR(30),
  image VARCHAR(30),
  description VARCHAR(80),
  FOREIGN KEY (user_id, username) REFERENCES users (id, username)
);



CREATE TABLE "comments"
(
  id serial PRIMARY KEY,
  post_id integer,
  username VARCHAR(25) REFERENCES users (username),
  hashtag VARCHAR(50),
  description VARCHAR(150),
  FOREIGN KEY (post_id) REFERENCES posts (post_id)
);

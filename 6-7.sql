CREATE TABLE "portfolio"
(
  post_id serial PRIMARY KEY,
  user_id  integer UNIQUE,
  username VARCHAR(30),
  image VARCHAR(30),
  description VARCHAR(80),
  project_link VARCHAR(150),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

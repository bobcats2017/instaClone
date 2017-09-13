ALTER TABLE "comments" ADD COLUMN user_id integer references users(id);

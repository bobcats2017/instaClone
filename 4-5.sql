ALTER TABLE "comments" DROP COLUMN "username";
ALTER TABLE "comments" DROP COLUMN "hashtag";

CREATE TABLE "hashtag";
ALTER TABLE "hashtag" ADD COLUMN "hashtag" VARCHAR(150);

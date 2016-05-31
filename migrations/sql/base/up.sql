CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(40) NOT NULL,
  email CITEXT UNIQUE NOT NULL,
  name VARCHAR(60),
  salt CHAR(32) UNIQUE NOT NULL,
  passhash CHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  profile_image_url VARCHAR(100),
  private BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS user_recipes (
  user_id UUID REFERENCES users (id) ON DELETE CASCADE,
  recipe_id UUID REFERENCES recipes (id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, recipe_id)
);

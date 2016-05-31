CREATE OR REPLACE FUNCTION get_user(id UUID) RETURNS
TABLE (
  user_id UUID,
  name VARCHAR(60),
  email CITEXT,
  username VARCHAR(40),
  recipes UUID[]
)
AS $$
BEGIN

  RETURN QUERY
    SELECT u.id, u.name, u.email, u.username, array_agg(ur.recipe_id) AS recipes
    FROM users AS u LEFT JOIN user_recipes AS ur ON u.id = ur.user_id
    WHERE u.id = $1
    GROUP BY u.id, u.name, u.email;

END;
$$ LANGUAGE plpgsql;  

/*CREATE OR REPLACE FUNCTION save_recipe(
  user_id UUID, 
  name VARCHAR(100), 
  description TEXT, 
  private BOOLEAN) 
RETURNS TABLE (
  recipe_id UUID,
  user_id UUID,
  name VARCHAR(100),
  description TEXT,
  private BOOLEAN
)
AS $$
BEGIN

  RETURN QUERY
    SELECT u.id, u.name, u.email, array_agg(ur.recipe_id) AS recipes
    FROM users AS u INNER JOIN user_recipes AS ur ON u.id = ur.user_id
    WHERE u.id = $1
    GROUP BY u.id, u.name, u.email;

END;
$$ LANGUAGE plpgsql;*/
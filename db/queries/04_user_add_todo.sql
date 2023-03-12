-- add a new todo with a known user, known category, and input name
-- default settings will assign timestamp with now() and done with FALSE

INSERT INTO todos (user_id, category_id, name)
VALUES ($1, $2, $3);

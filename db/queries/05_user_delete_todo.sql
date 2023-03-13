-- delete an existing todo with a known user and specific todos.id

DELETE FROM todos
WHERE user_id = $1 AND id = $2;

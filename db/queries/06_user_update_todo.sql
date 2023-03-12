-- update an existing todo's NAME with a known user and known todo id

UPDATE todos
SET name = $1
WHERE user_id = $2 AND id = $3;

-- update an existing todo's CATEGORY with a known user and known todo id

UPDATE todos
SET category_id = $1
WHERE user_id = $2 AND id = $3;

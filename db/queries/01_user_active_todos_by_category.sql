-- show active todo items by user and by category

SELECT *
FROM todos
WHERE user_id = $1 AND category_id = $2 AND done = FALSE;

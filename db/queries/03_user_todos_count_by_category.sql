-- count active todos by user's category

SELECT count(id)
FROM todos
WHERE user_id = $1 AND category_id = $2 AND done = FALSE;

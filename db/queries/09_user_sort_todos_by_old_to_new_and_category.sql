-- sort user's active todos by date created within category, oldest to newest

SELECT name
FROM todos
WHERE user_id = $1 AND category_id = $2 AND done = FALSE
ORDER BY date;

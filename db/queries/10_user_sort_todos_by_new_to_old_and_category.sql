-- sort user's active todos by date created within category, newest to oldest

SELECT name
FROM todos
WHERE user_id = $1 AND category_id = $2 AND done = FALSE
ORDER BY date DESC;

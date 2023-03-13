-- update todo STATUS to the opposite of current done status when user checks off or unchecks an item

UPDATE todos
SET done = NOT done
WHERE user_id = $1 AND id = $2;

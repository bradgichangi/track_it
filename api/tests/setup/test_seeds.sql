-- TRUNCATE = deletes records/data inside table
-- RESTART IDENTITY = resets counter/id
TRUNCATE users, user_habits, habit RESTART IDENTITY;

INSERT INTO users (name, email, password) 
VALUES
    ('user1', 'test1@mail.com', 'pass1'),
    ('user2', 'test2@mail.com', 'pass2'),
    ('user3', 'test3@mail.com', 'pass3');

INSERT INTO user_habits (user_id, habit_id) 
VALUES
    (1, 1), 
    (2, 2), 
    (3, 3);

INSERT INTO habit (name, description, frequency, start_date, last_completed, streak, completed)
VALUES
    ( 'habit1', null, 1, '2022-11-01', null, 3, false ),
    ( 'habit2', 'habit2 desc', 3, '2022-10-01', '2022-10-26', 5, false ),
    ( 'habit3', null, 1, '2022-09-30', '2022-10-26', 3, true );
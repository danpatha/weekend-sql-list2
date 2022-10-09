-- The database name should be 'list'
-- Initialized with these given sql commands

DROP TABLE IF EXISTS "list";
CREATE TABLE "list" (
"id" SERIAL PRIMARY KEY,
"task" VARCHAR (50) NOT NULL,
"estimatedTimeInMin" INT,
"complete" BOOLEAN DEFAULT FALSE,
"notes" VARCHAR (255));

INSERT INTO "list" 
("task","estimatedTimeInMin", "complete", "notes")
VALUES
('Grocery shopping', 60 , FALSE, 'I need to buy tacos to make for lunch!'),
('Walk the dog', 45 , FALSE, 'Looking forward to getting outside.'),
('Make lunch', 70 , FALSE, 'Play some music while you cook, it helps!'),
('Clean the bathroom', 50 , FALSE, 'This will not be enjoyable, but it is necessary!'),
('Takeout the trash and recycling', 2 , FALSE, 'Where does this stuff all go? Make a note to loop this up soon!'),
('Go to the gym', 90 , FALSE, 'Rehabbing my knee and doing some upper body');




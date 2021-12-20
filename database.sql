-- creates a simple task table 
-- and fills it with some dummy data

CREATE TABLE "task" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL,
	"description" TEXT,
	"complete" BOOLEAN NOT NULL DEFAULT false,
	"created" TIMESTAMP DEFAULT NOW(),
	"due_date" DATE,
	"img_url" VARCHAR(1000)
);

INSERT INTO "task" 
("name", "description", "due_date")
VALUES
('wash the car', 'use soap and wash the car; make sure to wash the salt off the underside', '2022-01-23'),
('feed the cats', 'feed the cats with yummy food', '2022-02-12'),
('RN todo', 'build a React Native ToDo app', '2021-12-31');
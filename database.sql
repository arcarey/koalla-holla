-- In Postico, create a new database called 'koala-holla'
-- creat a new query called 'holla-table'
-- paste in create table command and execute
-- paste in the INSERT command and execute

CREATE TABLE "holla_table" (
	"id" serial primary key,
	"name" varchar(30) not null,
	"gender" varchar(10) not null,
	"age" integer not null,
	"ready_to_transfer" BOOLEAN DEFAULT false,
	"notes" varchar(100)
);

INSERT INTO "holla_table" (
	"name", "gender", "age", "ready_to_transfer", "notes")
VALUES ('Jean', 'F', '5', 'Y', 'Allergic to lots of lava'),
('Ororo', 'F', '7', 'N', 'Loves listening to Paula (Abdul)'),
('Logan', 'M', '15', 'N', 'Loves the sauna'),
('Charlie', 'M', '9', 'Y', 'Favorite band is Nirvana'),
('Betsy', 'F', '4', 'Y', 'Has a pet iguana');
DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts (
	user_id INT PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 100 ) NOT NULL,
	first_name VARCHAR ( 50 )  NOT NULL,
	last_name VARCHAR ( 50 )  NOT NULL,
	gender VARCHAR ( 5 ),
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	date_of_birth date,
	address VARCHAR ( 255 ),
	role VARCHAR (10),
	verify_token VARCHAR (100) UNIQUE NOT NULL
);

DROP TABLE IF EXISTS pending_users;

CREATE TABLE pending_users (
	user_id INT PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 100 ) NOT NULL,
	first_name VARCHAR ( 50 )  NOT NULL,
	last_name VARCHAR ( 50 )  NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	verify_token VARCHAR ( 255 ) UNIQUE NOT NULL
);

DROP TABLE IF EXISTS access_tokens;

CREATE TABLE access_tokens (
	id INT PRIMARY KEY,
	user_id INT NOT NULL,
	token VARCHAR ( 255 ) UNIQUE NOT NULL
);

DROP TABLE IF EXISTS classes;

CREATE TABLE classes (
	class_id INT PRIMARY KEY,
	lecturer_id INT NOT NULL,
	class_name VARCHAR ( 100 ) NOT NULL,
	part VARCHAR ( 50 ),
	topic VARCHAR ( 50 ),
	room VARCHAR ( 50 )
);

DROP TABLE IF EXISTS class_members;

CREATE TABLE class_members (
	id INT PRIMARY KEY,
	class_id INT NOT NULL,
	member_id INT NOT NULL,
	role VARCHAR(10) NOT NULL
-- 	accept_token VARCHAR ( 100 )  NOT NULL
);

DROP TABLE IF EXISTS invitations;

CREATE TABLE invitations (
	id INT PRIMARY KEY,
	email VARCHAR (50) NOT NULL,
	class_id INT NOT NULL,
	role VARCHAR (10) NOT NULL,
	accept_token VARCHAR ( 255 )  NOT NULL
);

DROP TABLE IF EXISTS resources;

CREATE TABLE resources (
	id INT PRIMARY KEY,
	class_id INT NOT NULL,
	title VARCHAR(100) NOT NULL,
	type VARCHAR(20) NOT NULL,
	instruction VARCHAR(255),
	file_urls VARCHAR[],
	students VARCHAR[],
	grade_category VARCHAR(20),
	points VARCHAR (10),
	date DATE NOT NULL,
	due_date DATE,
	topic VARCHAR(100),
	rubric VARCHAR(100)
);




ALTER TABLE classes ADD CONSTRAINT "FK_classes_accounts" FOREIGN KEY (lecturer_id) REFERENCES accounts (user_id);
ALTER TABLE class_members ADD CONSTRAINT "FK_class_members_accounts" FOREIGN KEY (member_id) REFERENCES accounts (user_id);
ALTER TABLE class_members ADD CONSTRAINT "FK_class_members_classes" FOREIGN KEY (class_id) REFERENCES classes (class_id);
ALTER TABLE resources ADD CONSTRAINT "FK_resources_classes" FOREIGN KEY (class_id) REFERENCES classes (class_id);

ALTER TABLE access_tokens ADD CONSTRAINT "FK_access_tokens_accounts" FOREIGN KEY (user_id) REFERENCES accounts (user_id);
ALTER TABLE invitations ADD CONSTRAINT "FK_invitations_classes" FOREIGN KEy (class_id) REFERENCES classes (class_id);

-- ALTER TABLE classes DROP CONSTRAINT "FK_classes_accounts";
-- ALTER TABLE class_members DROP CONSTRAINT "FK_class_members_accounts";
-- ALTER TABLE class_members DROP CONSTRAINT "FK_class_members_classes";
-- ALTER TABLE access_tokens DROP CONSTRAINT "FK_access_tokens_accounts";
-- ALTER TABLE resources DROP CONSTRAINT "FK_resources_classes";
-- INSERT INTO classes(class_id, lecturer_id, class_name, part, topic, room) VALUES ('0', '0', 'Test class', '', '', '')

-- delete from classes where class_id = 0
delete from assignments where class_id = 0

-- delete from class_members where id = 1
-- delete from invitations where email = 'bkdhcmus@gmail.com'

-- delete from access_tokens where user_id = 1
	
-- delete from accounts where user_id = 2

-- delete from pending_users where user_id = 0


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
	user_id INT PRIMARY KEY,
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
	email VARCHAR (50) PRIMARY KEY,
	accept_token VARCHAR ( 255 )  NOT NULL,
	role VARCHAR (1) NOT NULL
);

ALTER TABLE classes ADD CONSTRAINT "FK_classes_accounts" FOREIGN KEY (lecturer_id) REFERENCES accounts (user_id);
ALTER TABLE class_members ADD CONSTRAINT "FK_class_members_accounts" FOREIGN KEY (member_id) REFERENCES accounts (user_id);
ALTER TABLE class_members ADD CONSTRAINT "FK_class_members_classes" FOREIGN KEY (class_id) REFERENCES classes (class_id);

ALTER TABLE access_tokens ADD CONSTRAINT "FK_access_tokens_accounts" FOREIGN KEY (user_id) REFERENCES accounts (user_id);

-- ALTER TABLE classes DROP CONSTRAINT "FK_classes_accounts";
-- ALTER TABLE class_members DROP CONSTRAINT "FK_class_members_accounts";
-- ALTER TABLE class_members DROP CONSTRAINT "FK_class_members_classes";

-- INSERT INTO classes(class_id, lecturer_id, class_name, part, topic, room) VALUES ('0', '0', 'Test class', '', '', '')

-- delete from classes where class_id = 0
-- delete from class_members where id = 1
-- delete from invitations where email = 'nhoklilom0102@gmail.com'

-- delete from access_tokens where user_id = 0
	
-- delete from accounts where user_id = 0

-- delete from pending_users where user_id = 0


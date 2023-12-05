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


ALTER TABLE access_tokens ADD CONSTRAINT "FK_access_tokens_accounts" FOREIGN KEY (user_id) REFERENCES accounts (user_id);
	
-- delete from access_tokens where user_id = 0
	
-- delete from accounts where user_id = 0



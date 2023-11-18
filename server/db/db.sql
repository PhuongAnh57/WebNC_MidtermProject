DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts (
	user_id INT PRIMARY KEY,
	first_name VARCHAR ( 50 )  NOT NULL,
	last_name VARCHAR ( 50 )  NOT NULL,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 100 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	address VARCHAR ( 255 ) NOT NULL
);